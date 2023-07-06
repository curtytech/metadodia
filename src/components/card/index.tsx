import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from "./style";


// import { useState } from "react";
import theme from '../../theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GoalsModel } from 'src/database/model/goalsModel';

type typeCard = {
    id: number,
    isChecked: Boolean,
    goalName: string,
    onRemove(): (item: GoalsModel) => void,
    onCheck(): (item: GoalsModel) => void,
}

export function Card({ isChecked, goalName, onRemove, onCheck }: typeCard) {
    return (
        
        <View style={{ alignItems: 'center'}}>
            <View style={styles.container}>
                <View>
                    {isChecked ?
                        <TouchableOpacity
                            onPress={onCheck}>
                            <AntDesign name="checkcircle" size={25} color={theme.COLORS.primary} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={onCheck}>
                            <Entypo name="circle" size={25} color={theme.COLORS.primary} />
                        </TouchableOpacity>
                    }
                </View>
                <Text style={styles.text}> {goalName} </Text>
                <TouchableOpacity
                    onPress={onRemove}>
                    <Ionicons name="trash" size={25} color={theme.COLORS.GRAY_200} />
                </TouchableOpacity>
            </View>


        </View>
    )
}