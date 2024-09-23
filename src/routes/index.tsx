import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
// import { LogoSVG } from '../assets/Metadodia.svg';

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
            {/* <LogoSVG width={200} height={200} /> */}

        </NavigationContainer>
    )
}