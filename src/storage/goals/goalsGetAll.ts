import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal_Collection } from '../storage.config'

export async function GoalsGetAll() {
    try {
        const storage = await AsyncStorage.getItem(Goal_Collection);
        const goals: string[] = storage ? JSON.parse(storage) : [];

        return goals;

    } catch (error) {
        throw error;
    }
}