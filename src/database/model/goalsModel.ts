import { Model } from "@nozbe/watermelondb";

import { field } from '@nozbe/watermelondb/decorators';

export class GoalsModel extends Model {
    static table = 'goals';

    @field('name')
    name!: string;
    @field('isChecked')
    isChecked!: boolean;
}