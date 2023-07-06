import { useState, useEffect } from "react";
import { Text, View, FlatList, TextInput, Alert, TouchableOpacity, Keyboard } from 'react-native';

import { Logocontainer } from '../../components/Logocontainer';
import { Card } from '../../components/card';

import theme from '../../theme/index';
import { styles } from "./style";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

import { database } from "../../database";
import { GoalsModel } from "../../database/model/goalsModel";
import { NotificationsModel } from "src/database/model/notificationsModel";
import { Q } from "@nozbe/watermelondb";

import { useNavigation } from "@react-navigation/native";

type typeGoals = {
    id: number,
    isChecked: Boolean,
    name: string,
}

export function Home() {

    const [goals, setGoals] = useState<GoalsModel[]>([]);
    const [newGoalName, setNewGoalName] = useState('');
    const [concluidas, setConcluidas] = useState(0);
    const [criadas, setCriadas] = useState(0);
    const [afazer, setAfazer] = useState(0);

    const navigation = useNavigation();

    async function fetchNotifications() {
        const notificationsCollection = database.get<NotificationsModel>('notifications');
        const consultaNotificationCriada = await notificationsCollection.query(Q.where('idnotification', 1)).fetch();
  
        if (consultaNotificationCriada.length < 1) {
            await database.write(async () => {
                await database.get<NotificationsModel>('notifications').create(data => {
                    data.time = '09:00', data.idnotification = 1
                })
            })
        } 
    }

    async function fetchGoals() {
        const goalsCollection = database.get<GoalsModel>('goals');
        const allGoals = await goalsCollection.query().fetch();
        setGoals(allGoals);
        setCriadas(allGoals.length)

        const concluidas = await goalsCollection.query(Q.where('isChecked', true)).fetch();
        setConcluidas(concluidas.length)
        const afazer = await goalsCollection.query(Q.where('isChecked', false)).fetch();
        setAfazer(afazer.length)
    }

    async function addGoal() {
        if (newGoalName != '') {

            await database.write(async () => {
                await database.get<GoalsModel>('goals').create(data => {
                    data.name = newGoalName, data.isChecked = false
                })
            })

            setNewGoalName('')
            Keyboard.dismiss();
            fetchGoals();

        } else {
            Alert.alert('Preencha o campo para adicionar a meta!')
        }
    };

    async function removeGoal(item: GoalsModel) {

        await database.write(async () => {
            await item.destroyPermanently();
        })

        fetchGoals();
    }

    async function check(item: GoalsModel) {
        if (item.isChecked == true) {
            await database.write(async () => {
                await item.update(data => {
                    data.isChecked = false
                })
            })

        } else {
            await database.write(async () => {
                await item.update(data => {
                    data.isChecked = true
                })
            })
        }

        fetchGoals();
    }

    useEffect(() => {
        fetchGoals();
        fetchNotifications;
    }, [])

    return (
        <View style={{ backgroundColor: theme.COLORS.GRAY_500, height: 10000 }}>
            <Logocontainer />
            {/* <View style={{ top: -50 }}> */}
            <View >
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='Adicione uma Meta'
                        onChangeText={setNewGoalName}
                        placeholderTextColor={theme.COLORS.GRAY_200}
                        value={newGoalName}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={addGoal}>
                        <AntDesign name="pluscircleo" size={18} color={theme.COLORS.GRAY_100} />

                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                    <TouchableOpacity style={styles.buttonConfiguracoes}
                        onPress={() => navigation.navigate('Configuracoes')}
                    >

                        <FontAwesome5 name="cogs" size={18} color={theme.COLORS.GRAY_100} />
                        <Text style={{ color: theme.COLORS.GRAY_100 }}>Configurações</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{
                        minHeight: 200,
                        maxHeight: 400,
                        marginBottom: 25
                    }}
                    data={goals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (<Card isChecked={item.isChecked} goalName={item.name} onRemove={() => removeGoal(item)} onCheck={() => check(item)} />)}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.listEmpty}>
                            <FontAwesome5 style={{ marginBottom: 5 }} name="clipboard-list" size={35} color="white" />
                            <Text style={styles.listEmptyTextBold}>
                                Você ainda não tem metas cadastradas!
                            </Text>

                            <Text style={styles.listEmptyText}>
                                Crie metas e organize seus itens a fazer
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View >
    )
}