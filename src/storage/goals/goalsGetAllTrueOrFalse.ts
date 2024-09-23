import { GoalsGetAll } from "./goalsGetAll";

export async function GoalsGetAllTrueOrFalse(status: boolean) {
    try {
        const storedGoals = await GoalsGetAll();
        
        const filtered = storedGoals.filter(item => item.status == status);

        return filtered;

    } catch (error) {
        throw error;
    }
}