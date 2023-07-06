import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const goalsSchema = tableSchema({
    name: 'goals',
    columns: [
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'isChecked',
            type: 'boolean',
        }
    ]
})