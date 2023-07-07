import { Button, StatusBar } from 'react-native';
import { Text, View } from 'react-native';
import { Home } from "./src/screens/Home";

import Routes from './src/routes'
import theme from './src/theme';
import { NavigationContainer } from '@react-navigation/native';
// import { database } from 'src/database';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import notifee, { AndroidImportance } from '@notifee/react-native'

export default function App() {
  const Stack = createNativeStackNavigator();

  // async function displayNotification() {
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: '1',
  //     name: 'Notifications',
  //     vibration: true,
  //     importance: AndroidImportance.HIGH
  //   })

  //   await notifee.displayNotification({
  //     id: '1',
  //     title: 'Oiiii',
  //     body: 'iojasoidj asjdoajsoidjas od',
  //     android: {
  //       channelId
  //     }
  //   })
  // }


  return (
    <NavigationContainer>
      <View style={{
        backgroundColor: theme.COLORS.GRAY_500,
        height: 10000
      }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {/* <View style={{marginTop: 50}} >
          <Button  title='notifee' onPress={() => console.log('asdasd')} />
        </View>  */}
        <Routes />
      </View>
    </NavigationContainer>

  );
}

