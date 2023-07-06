import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from 'react-native';

import { Logocontainer } from '../../components/Logocontainer';

import theme from '../../theme/index';
import { styles } from "./style";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { database } from "../../database";
import { NotificationsModel } from "src/database/model/notificationsModel";
import { GoalsModel } from "../../database/model/goalsModel";
import { Q } from "@nozbe/watermelondb";


import DateTimePicker from '@react-native-community/datetimepicker';
import { compareAsc, format } from 'date-fns'

import { useNavigation } from "@react-navigation/native";

type typeTasks = {
    id: number,
    isChecked: Boolean,
    name: string,
}

export function Configuracoes() {

    const [newTaskName, setNewTaskName] = useState('');
    const navigation = useNavigation();

    const [date, setDate] = useState(new Date(1598051730000));
    const [time, setTime] = useState('');
    const [notificationTime, setNotificationTime] = useState('');
    const [show, setShow] = useState(false);
    let dataSelecionada = '';
  
    function onChangeTime(event: any, selectedDate: string) {
        // console.log(selectedDate);
        setShow(false)
        dataSelecionada = selectedDate;
        updateNotification(dataSelecionada)
        console.log(dataSelecionada);

    }
    // console.log(selectedDate);
    const showTimepicker = () => {
        setShow(true)
    };
    // console.log(dataSelecionada);

    async function updateNotification(dataSelecionada: string) {
        setTime(format(dataSelecionada, 'HH:mm'))
        // console.log(time);
        // console.log(dataSelecionada);

        const notificationsCollection = database.get<NotificationsModel>('notifications');
        const consultaNotificationCriada = await notificationsCollection.query(Q.where('idnotification', 1));
        await database.write(async () => {
            const updatedNotification = await consultaNotificationCriada[0].update(data => {
                data.time = time
            });
        });

        fetchNotifications();

        // const queryUpdateNotification: any = await database.get('notifications').query(
        //     Q.unsafeSqlQuery(`UPDATE notifications SET time = '12:00' WHERE idnotification = 1`)).unsafeFetchRaw()
        //  console.log(queryUpdateNotification);
        // console.log('teste');

    }

    async function fetchNotifications() {
        const notificationsCollection = database.get<NotificationsModel>('notifications');
        const consultaNotificationCriada = await notificationsCollection.query(Q.where('idnotification', 1)).fetch();

        if (consultaNotificationCriada.length < 1) {
            await database.write(async () => {
                await database.get<NotificationsModel>('notifications').create(data => {
                    data.time = '07:00', data.idnotification = 1
                })
            })
        }
        dataSelecionada = consultaNotificationCriada[0].time
        setTime(consultaNotificationCriada[0].time)
        // console.log(consultaNotificationCriada);
        // console.log(dataSelecionada);
    }
    
    useEffect(() => {
        fetchNotifications();
    }, [])

    // useEffect(() => {
    //     onChangeTime        
    //     console.log('efect');
    // }, [show])
    return (
        <View style={{ backgroundColor: theme.COLORS.GRAY_500, height: 10000 }}>
            <Logocontainer />
            {/* <View style={{ top: -50 }}> */}
            <View >
                <View style={{ margin: 20 }}>
                    <TouchableOpacity style={styles.buttonConfiguracoes}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <FontAwesome5 name="arrow-left" size={18} color={theme.COLORS.GRAY_100} />
                        <Text style={{ color: theme.COLORS.GRAY_100 }}>Voltar</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.containerInformacoes}>
                    <Text style={styles.containerText}> O Horário do lembrete está definido para: {time} h</Text>
                    {/* <Text style={styles.containerText}> O Horário do lembrete está definido para: {format(date, 'HH:mm')} h</Text> */}

                    {/* <Button style={styles.buttonConfiguracoes} onPress={showTimepicker} title="Ajustar Horário do Lembrete" /> */}

                    <TouchableOpacity
                        style={styles.buttonHorario}
                        onPress={showTimepicker}
                    >
                        <Text style={{ color: theme.COLORS.GRAY_100 }}>Ajustar Horário do Lembrete</Text>
                    </TouchableOpacity>

                </View>

                {show && (
                    <DateTimePicker
                        //     style={{ 
                        //     backgroundColor: 'red',
                        //     borderColor: 'white', 
                        //     width: 50,
                        //     padding: 60,
                        //     textColor: 'red'
                        // }}
                        testID="dateTimePicker"
                        value={date}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}

                    />
                )}

            </View>
        </View>
    )
}