import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Configuracoes } from '@screens/Configuracoes';



export default function Routes() {
    
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Configuracoes" component={Configuracoes} />
        </Stack.Navigator>
    );
}