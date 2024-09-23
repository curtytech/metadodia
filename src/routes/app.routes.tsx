import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/home';
import { Settings } from '../screens/settings';
import { FinishedGoals } from '../screens/finishedgoals';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {

    return (

        <Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#DDDEDF',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                //   fontWeight: 'bold',              
            },
        }}

        >
            <Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
            />
            <Screen
                name='FinishedGoals'
                component={FinishedGoals}
                options={{ headerShown: false, title: 'Metas Alcançadas' }}
            />
            <Screen
                name='Settings'
                component={Settings}
                options={{ headerShown: false, title: 'Configurações' }}
            />

        </Navigator>
    )


}
