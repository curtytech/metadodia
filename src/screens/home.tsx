import { Text, View, Button, Platform, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, Image } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { s } from "react-native-wind";

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { GoalCard } from '../components/GoalCard';
import { GoalsGetAll } from '../storage/goals/goalsGetAll';
import { GoalsCreate } from '../storage/goals/goalsCreate';
import { GoalsEdit } from '../storage/goals/goalsEdit';
import { GoalsEditName } from '../storage/goals/goalsEditName';
import { GoalsGetAllTrueOrFalse } from '../storage/goals/goalsGetAllTrueOrFalse';
import { GoalsRemoveById } from '../storage/goals/goalsRemoveById';
import { First_Notification } from '../storage/storage.config';
import { Second_Notification } from '../storage/storage.config';
import { Third_Notification } from '../storage/storage.config';

import LogoSVG from '../assets/Metadodia.svg'

import { Goal } from '../@types/goalType';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

type objType = {
    id: number,
    goal: string,
    status: boolean
}
type TypeTime = {
    hours: number,
    minutes: number,
    seconds: number
}

export function Home() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [inputGoal, setInputGoal] = useState('');
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<Goal>();
    // const [goalsToView, setGoalsToView] = useState('');

    // const [firstNotificationH, setFirstNotificationH] = useState(0);
    // const [firstNotificationM, setFirstNotificationM] = useState(0);
    // const [secondNotificationH, setSecondNotificationH] = useState(0);
    // const [secondNotificationM, setSecondNotificationM] = useState(0);
    // const [thirdNotificationH, setThirdNotificationH] = useState(0);
    // const [thirdNotificationM, setThirdNotificationM] = useState(0);

    const navigation = useNavigation();

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    async function schedulePushNotification() {

        const notificationOne = await AsyncStorage.getItem(First_Notification);
        const notificationOneJson: TypeTime = notificationOne ? JSON.parse(notificationOne) : '';

        const notificationTwo = await AsyncStorage.getItem(Second_Notification);
        const notificationTwoJson: TypeTime = notificationTwo ? JSON.parse(notificationTwo) : '';

        const notificationThree = await AsyncStorage.getItem(Third_Notification);
        const notificationThreeJson: TypeTime = notificationThree ? JSON.parse(notificationThree) : '';

        if (notificationOneJson.hours == undefined) {
            notificationOneJson.hours = 8;
        }
        if (notificationTwoJson.hours == undefined) {
            notificationTwoJson.hours = 12;
        }
        if (notificationThreeJson.hours == undefined) {
            notificationThreeJson.hours = 17;
        }

        if (notificationOneJson.hours != 0 && notificationTwoJson.hours != 0 && notificationThreeJson.hours != 0) {

            await Notifications.cancelAllScheduledNotificationsAsync()

            const data = await GoalsGetAllTrueOrFalse(true);

            let concatenatedGoals = '';

            let goalNumber = 1;

            for (let i = 0; i < data.length; i++) {
                let goal = goalNumber + ': ' + String(data[i].goal);
                goalNumber++;
                concatenatedGoals += goal + '\n';
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Aqui estão suas metas do dia!",
                    body: concatenatedGoals,
                    data: { data: 'goes here' },
                    sound: true, // Ativa o som
                },

                trigger: {
                    hour: Number(notificationOneJson.hours),
                    minute: Number(notificationOneJson.minutes),
                    repeats: true, // Isso fará com que a notificação seja repetida todos os dias na mesma hora.
                },
                // trigger: { seconds: 1 },
            })

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Aqui estão suas metas do dia!",
                    body: concatenatedGoals,
                    data: { data: 'goes here' },
                },
                trigger: {
                    hour: Number(notificationTwoJson.hours),
                    minute: Number(notificationTwoJson.minutes),
                    repeats: true, // Isso fará com que a notificação seja repetida todos os dias na mesma hora.
                },
                // trigger: { seconds: 1 },
            })

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Aqui estão suas metas do dia!",
                    body: concatenatedGoals,
                    data: { data: 'goes here' },
                },
                trigger: {
                    hour: Number(notificationThreeJson.hours),
                    minute: Number(notificationThreeJson.minutes),
                    repeats: true, // Isso fará com que a notificação seja repetida todos os dias na mesma hora.
                },
                // trigger: { seconds: 1 },
            })
        } else {
            fetchGoals()
        }
        // pega o token
        // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }

    async function fetchGoals() {
        // await AsyncStorage.removeItem('@metadodia:goals');
        try {
            const data = await GoalsGetAllTrueOrFalse(true);
            setGoals(data);

            await schedulePushNotification();
        } catch (error) {
            console.log(error);
        }
    }

    async function addGoal() {

        if (inputGoal == '') {
            Alert.alert('Preencha o campo nova meta.')
        } else {
            try {
                let data = await GoalsGetAll();
                let idMaximo: number;

                const getAllIds = data.map((item) => item.id);
                if (data.length == 0) {
                    idMaximo = 0
                } else {
                    idMaximo = Math.max.apply(null, getAllIds)
                }

                const id = idMaximo + 1;
                const obj: objType = { id: id, goal: inputGoal, status: true };

                setInputGoal('');
                Keyboard.dismiss();
                await GoalsCreate(obj);

                fetchGoals()
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function editGoal(item: objType) {
        try {
            await GoalsEdit(item);
            await fetchGoals()
        } catch (error) {
            console.log(error);
        }
    }

    async function startEditing(item: Goal) {
        setIsEditing(true);
        setInputGoal(item.goal)
        setEditingItem(item)
    }
    async function confirmEditing() {
        try {
            await GoalsEditName(editingItem, inputGoal);
            await fetchGoals()
            cancelEditing()
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteGoal(item: objType) {
        // console.log(item.id);
        try {
            await GoalsRemoveById(item);
            await fetchGoals()
        } catch (error) {
            console.log(error);
        }
    }

    function cancelEditing() {
        setIsEditing(false);
        setInputGoal('')
        Keyboard.dismiss();
    }

    useFocusEffect(useCallback(() => {
        fetchGoals()
    }, []))

    return (
        <View style={s`bg-gray-300 w-full h-full`}>
            <View style={s`bg-black justify-between flex flex-row pt-1`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FinishedGoals')}
                    style={s`p-3 bg-black mt-3 ml-2`}>
                    <FontAwesome5 name="chart-line" size={35} color='#1d4ed8' />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    style={s`p-3 bg-black mt-3 mr-2`}>
                    <FontAwesome5 name="cog" size={32} color='#1d4ed8' />
                </TouchableOpacity>

                {/* <Image source='../assets/Metadodia.svg' style={{ width: 500, height: 500 }} /> */}
            </View>
            <View style={s`bg-black justify-center flex flex-row `}>
                <LogoSVG style={s`mb-5`} />
            </View>


            <View style={s`mt-3 flex flex-row`} >
                <TextInput
                    value={inputGoal}
                    onChangeText={text => setInputGoal(text)}
                    placeholder='Nova meta'
                    placeholderTextColor='#6b7280'
                    style={s`ml-3 mr-3 bg-white p-3 pl-5 pr-3 rounded-lg w-9/12 border-l-8 border-blue-700 text-gray-600 font-semibold`} />

                {isEditing ?
                    <TouchableOpacity
                        onPress={confirmEditing}
                        style={s`mr-3 rounded-lg items-center p-3 w-2/12 bg-blue-700`}>
                        <FontAwesome name="edit" size={28} color="white" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={addGoal}
                        style={s`mr-3 rounded-lg items-center p-3 w-2/12 bg-blue-700`}>
                        <FontAwesome name="plus-circle" size={28} color="white" />
                    </TouchableOpacity>
                }

            </View>

            <View style={s`mt-3 mb-3 mx-4 flex flex-row items-center justify-between`} >

            </View>

            <FlatList
                style={{ maxHeight: 450, paddingBottom: 50 }}
                data={goals}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <GoalCard goal={item.goal} id={item.id} status={item.status} canEdit={true}
                    item={item} editGoalProp={() => editGoal(item)} deleteGoalProp={() => deleteGoal(item)} editGoalNameProp={() => startEditing(item)} />}

                ListEmptyComponent={() => <Text style={s`text-center text-lg font-bold mt-5 mx-5 rounded-lg p-5 bg-blue-700 text-white `}>Que tal cadastrar sua novas metas?</Text>}
                showsVerticalScrollIndicator={false}
            />

            {/* <TouchableOpacity style={s`mt-5 bg-blue-500 p-2 rounded-lg  items-center `}
                onPress={async () => {
                    await schedulePushNotification();
                }}>
                <Text>Notificação de Teste</Text>
            </TouchableOpacity> */}

            {isEditing && <View style={s`justify-center items-center`}>
                <FontAwesome style={s`mb-10 text-red-400`} name="close" onPress={() => cancelEditing()} size={50} color="white" />
            </View>}


        </View>
    )
}