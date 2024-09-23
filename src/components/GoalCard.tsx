import { Text, View, TouchableOpacity } from 'react-native';
import { s } from "react-native-wind";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type TypeItem = {
    id: number;
    goal: string;
    status: boolean;
}

type Props = {
    item: TypeItem;
    id: number;
    goal: string;
    status: boolean;
    canEdit: boolean;
    editGoalProp(item: object): void;
    editGoalNameProp?(item: object): void;
    deleteGoalProp(item: object): void;
}

export function GoalCard({ id, goal, status, item, editGoalProp, canEdit, editGoalNameProp, deleteGoalProp }: Props) {
    return (
        <View style={s`mb-3 flex flex-row bg-white rounded-lg mx-3 p-3 border-l-8 border-blue-700`}>
            <Text style={s`w-9/12 text-gray-500 font-semibold`}>{goal}</Text>
            <View style={s`w-3/12 flex flex-row justify-end`}>
                <TouchableOpacity
                    onPress={() => editGoalProp(item)}
                    style={s`mr-2`}
                >
                    <FontAwesome name="check-square-o" size={25} color="#1d4ed8" />
                </TouchableOpacity>

                {/* O botão de editar só aparecerá se canEdit for true */}
                {canEdit && (
                    <TouchableOpacity
                        onPress={() => editGoalNameProp && editGoalNameProp(item)}
                        style={s`mr-2 ml-1`}
                    >
                        <FontAwesome name="edit" size={25} color="#1d4ed8" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => deleteGoalProp(item)}
                >
                    <MaterialCommunityIcons name="delete-empty" size={25} color="#1d4ed8" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
