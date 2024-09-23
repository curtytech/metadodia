import { Text, View, Button, Platform, TextInput, TouchableOpacity, FlatList, Alert, Keyboard } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { s } from "react-native-wind";

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { GoalCard } from '../components/GoalCard';
import { GoalsEdit } from '../storage/goals/goalsEdit';
import { GoalsGetAllTrueOrFalse } from '../storage/goals/goalsGetAllTrueOrFalse';
import { GoalsRemoveById } from '../storage/goals/goalsRemoveById';

import LogoSVG from '../assets/Metadodia.svg'
import Goal from '@/@types/goalType';
type objType = {
    id: number,
    goal: string,
    status: boolean
}

export function FinishedGoals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const navigation = useNavigation();

    async function fetchGoals() {
        try {
            const data = await GoalsGetAllTrueOrFalse(false);
            setGoals(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function editGoal(item: Goal) {
        try {
            await GoalsEdit(item);
            await fetchGoals()
        } catch (error) {
            console.log(error);
        }
    }
    async function editGoalName(item: Goal) {
        try {
            console.log(item)
            // await GoalsEdit(item);
            // await fetchGoals()
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteGoal(item: Goal) {
        try {
            await GoalsRemoveById(item);
            await fetchGoals()
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchGoals()
        // console.log(goals);
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

            <FlatList
                style={{ maxHeight: 500, marginTop: 10 }}
                data={goals}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <GoalCard goal={item.goal} id={item.id} status={item.status} canEdit={false}
                    item={item} editGoalProp={() => editGoal(item)} deleteGoalProp={() => deleteGoal(item)} />}

                ListEmptyComponent={() => <Text style={s`text-center text-lg font-bold mt-5 mx-5 rounded-lg p-5 bg-blue-700 text-white `}>Que tal cadastrar sua novas metas?</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View >
    )
}