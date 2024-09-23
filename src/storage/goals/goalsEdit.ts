import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal_Collection } from "../storage.config";
import { GoalsGetAll } from "./goalsGetAll";
import Goal from '@/@types/goalType';

export async function GoalsEdit(editGoal: Goal) {
    try {
        const storedGoals = await GoalsGetAll();

        if (editGoal.status == true) {
            editGoal.status = false
        } else {
            editGoal.status = true
        }

        if (storedGoals.length <= 1) {

            const storage = JSON.stringify([editGoal]);
            await AsyncStorage.setItem(Goal_Collection, storage)
        } else {
            const filtered = storedGoals.filter(item => item.id !== editGoal.id);

            // if (editGoal.status == true) {
            //     editGoal.status = false
            // } else {
            //     editGoal.status = true
            // }

            const storage = JSON.stringify([...filtered, editGoal]);
            await AsyncStorage.setItem(Goal_Collection, storage)

        }
    } catch (error) {
        throw error;
    }
}