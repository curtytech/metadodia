import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal_Collection } from "../storage.config";
import { GoalsGetAll } from "./goalsGetAll";

export async function GoalsRemoveById(itemToDelete: object) {
    try {

        //neste parametro estao as refeicoes nao deletadas ->>>>>>> goalsWithoutDelete
        let storedGoals = await GoalsGetAll();

        if (storedGoals.length == 1) {
            await AsyncStorage.removeItem(Goal_Collection);
        } else {
            const filterStayGoals = storedGoals.filter(item => item.id !== itemToDelete.id);

            const storage = JSON.stringify(filterStayGoals);

            await AsyncStorage.setItem(Goal_Collection, storage)
        }

    } catch (error) {
        throw error;
        console.log(error);
    }
}