import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal_Collection } from "../storage.config";
import { GoalsGetAll } from "./goalsGetAll";
import Goal from "@/@types/goalType";

export async function GoalsEditName(editGoal: Goal, newName: string) {
    try {
        const storedGoals = await GoalsGetAll(); // Busca todas as metas salvas

        // Atualizar o nome da meta
        editGoal.goal = newName;

        if (storedGoals.length <= 1) {
            // Se só houver uma meta armazenada, basta substituir
            const storage = JSON.stringify([editGoal]);
            await AsyncStorage.setItem(Goal_Collection, storage);
        } else {
            // Se houver várias metas, filtra a meta que será editada e substitui pelo objeto atualizado
            const filtered = storedGoals.filter(item => item.id !== editGoal.id);

            // Adiciona a meta editada e salva todas as metas novamente
            const storage = JSON.stringify([...filtered, editGoal]);
            await AsyncStorage.setItem(Goal_Collection, storage);
        }
    } catch (error) {
        throw error; // Lança o erro caso ocorra algum problema
    }
}
