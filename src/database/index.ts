import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { schemas } from './schemas';
import { GoalsModel } from './model/goalsModel';
import { NotificationsModel } from './model/notificationsModel';

const adapter = new SQLiteAdapter({
    schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses: [GoalsModel, NotificationsModel]
});