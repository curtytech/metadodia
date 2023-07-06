import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const notificationsSchema = tableSchema({
    name: 'notifications',
    columns: [
        {
            name: 'time',
            type: 'string',
        },
        {
            name: 'idnotification',
            type: 'number',
        }
    ]
})