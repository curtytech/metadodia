import { Text, View, Button, Platform, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
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
import { TimePicker, ValueMap } from "react-native-simple-time-picker";

import React from 'react';

import LogoSVG from '../assets/Metadodia.svg'


import { First_Notification, Second_Notification, Third_Notification } from '../storage/storage.config';
export function Settings() {
    const navigation = useNavigation();

    const [value, setValue] = useState<ValueMap>({
        hours: 8, minutes: 0, seconds: 0,
    });
    const [valueTwo, setValueTwo] = useState<ValueMap>({
        hours: 12, minutes: 0, seconds: 0,
    });
    const [valueThree, setValueThree] = useState<ValueMap>({
        hours: 17, minutes: 0, seconds: 0,
    });

    async function handleChangeOne(value: ValueMap) {
        try {
            setValue(value);
            const storage = JSON.stringify(value);
            await AsyncStorage.setItem(First_Notification, storage)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleChangeTwo(value: ValueMap) {
        try {
            setValueTwo(value);
            const storage = JSON.stringify(value);
            await AsyncStorage.setItem(Second_Notification, storage)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleChangeThree(value: ValueMap) {
        try {
            setValueThree(value);
            const storage = JSON.stringify(value);
            await AsyncStorage.setItem(Third_Notification, storage)
        } catch (error) {
            console.log(error);
        }
    }

    async function getNotifications() {
        const NotificationOne = await AsyncStorage.getItem(First_Notification);
        const NotificationOneJson = NotificationOne ? JSON.parse(NotificationOne) : null;
        if (NotificationOneJson != null) {
            setValue(NotificationOneJson)
        }
        const NotificationTwo = await AsyncStorage.getItem(Second_Notification);
        const NotificationTwoJson = NotificationTwo ? JSON.parse(NotificationTwo) : null;
        if (NotificationTwoJson != null) {
            setValueTwo(NotificationTwoJson)
        }
        const NotificationThree = await AsyncStorage.getItem(Third_Notification);
        const NotificationThreeJson = NotificationThree ? JSON.parse(NotificationThree) : null;
        if (NotificationThreeJson != null) {
            setValueThree(NotificationThreeJson)
        }
    }

    useFocusEffect(useCallback(() => {
        getNotifications()
    }, []))


    return (
        <View style={s`bg-gray-300 w-full h-full`}>

            <View style={s`bg-black justify-between flex flex-row pt-1`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={s`p-3 bg-black mt-3 ml-2`}>
                    <FontAwesome5 name="arrow-left" size={35} color='#1d4ed8' />
                </TouchableOpacity>

            </View>
            <View style={s`bg-black justify-center flex flex-row `}>
                <LogoSVG style={s`mb-5`} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 550, paddingBottom: 50 }}>
                <View style={s`bg-white rounded-lg mx-5 mt-5 p-3 border-l-8 border-blue-700`}>
                    <Text style={s`font-bold text-center text-lg text-blue-700`}>Escolha o primeiro horário para receber as notificações</Text>

                    <View style={s`mx-15 mt-2`}>
                        <View style={s`rounded-lg mx-2 `}>
                            <View style={s` rounded-lg mx-2 border-2 border-blue-700`}>
                                <TimePicker
                                    hoursUnit='h'
                                    dropdownIconColor='#1d4ed8'
                                    textColor='#1d4ed8'
                                    // mode='dropdown'
                                    // selectionColor='#226497'
                                    minutesUnit='m' value={value} onChange={handleChangeOne} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={s`bg-white rounded-lg mx-5 mt-5 p-3 border-l-8 border-blue-700`}>
                    <Text style={s`font-bold text-center text-lg text-blue-700`}>Escolha o segundo horário para receber as notificações</Text>

                    <View style={s`mx-15 mt-2`}>
                        <View style={s` rounded-lg mx-2 border-2 border-blue-700`}>
                            <TimePicker
                                dropdownIconColor='#1d4ed8'
                                textColor='#1d4ed8'
                                hoursUnit='h'
                                minutesUnit='m' style={{ backgroundColor: 'white' }} value={valueTwo} onChange={handleChangeTwo} />
                        </View>
                    </View>
                </View>
                <View style={s`bg-white rounded-lg mx-5 mt-5 p-3 border-l-8 border-blue-700`}>
                    <Text style={s`font-bold text-center text-lg text-blue-700`}>Escolha o terceiro horário para receber as notificações</Text>

                    <View style={s`mx-15 mt-2`}>
                        <View style={s` rounded-lg mx-2 border-2 border-blue-700`}>
                            <TimePicker
                                dropdownIconColor='#1d4ed8'
                                textColor='#1d4ed8'
                                hoursUnit='h'
                                minutesUnit='m' style={{ backgroundColor: 'white' }} value={valueThree} onChange={handleChangeThree} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}