import { appSchema } from "@nozbe/watermelondb";
import { goalsSchema } from "./goalsSchema";
import { notificationsSchema } from "./notificationsSchema";

export const schemas = appSchema({
    version: 13,
    tables: [
        goalsSchema, notificationsSchema
    ]
})