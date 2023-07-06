import { StatusBar } from 'react-native';
import { Text, View } from 'react-native';
import { Home } from "./src/screens/Home";

import Routes from './src/routes'
import theme from './src/theme';
import { NavigationContainer } from '@react-navigation/native';
// import { database } from 'src/database';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const Stack = createNativeStackNavigator();
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
      {/* <Text>asdasdasdasd</Text> */}
      {/* <Home /> */}
      <Routes />
      </View>
    </NavigationContainer>

  );
}

