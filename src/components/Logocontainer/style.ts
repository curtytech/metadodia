import { StyleSheet } from "react-native"
import theme from '../../theme/index';

export const styles = StyleSheet.create({
    container: {        
        flexDirection: 'row',        
        justifyContent: 'center',
        backgroundColor: theme.COLORS.GRAY_700,
        // padding: '15%'
    },

    logo: {
        // resizeMode: 'contain',
        // width: 300,
        // backgroundColor: theme.COLORS.GRAY_700,
        marginVertical: 50
    }

    
})