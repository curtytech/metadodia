import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal_Collection } from "../storage.config";
import { GoalsGetAll } from "./goalsGetAll";

export async function GoalsCreate(newgoal: object) {
    try {
        const storedgoals = await GoalsGetAll();

        const storage = JSON.stringify([...storedgoals, newgoal])
        await AsyncStorage.setItem(Goal_Collection, storage)

        
        
        // await AsyncStorage.removeItem(goal_Collection)
    } catch (error) {
        throw error;
    }
}