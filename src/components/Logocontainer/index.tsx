import { StyleSheet, Text, View, Image } from 'react-native';
// import Logo from '../../assets/logo.png';
import { styles } from './style'
import LogoSVG from '../../assets/LogoSVG.svg'

export function Logocontainer() {
    return (
        <View>
            <View style={styles.container}>
                <LogoSVG 
                style={styles.logo}
                />
                {/* <Image
                    style={styles.logo}
                    source={Logo}
                    alt="Logo"                    
                /> */}
            </View>
        </View>
    )
}