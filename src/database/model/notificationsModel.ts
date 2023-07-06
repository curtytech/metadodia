import { Model } from "@nozbe/watermelondb";

import { field } from '@nozbe/watermelondb/decorators';

export class NotificationsModel extends Model {
    static table = 'notifications';

    @field('time')
    time!: string;
    @field('idnotification')
    idnotification!: number;
}