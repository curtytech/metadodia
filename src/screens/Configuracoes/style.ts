import { StyleSheet } from "react-native";
import theme from '../../theme/index';

export const styles = StyleSheet.create({

    numbers: {
        backgroundColor: theme.COLORS.primary,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: theme.FONT_SIZE.MD,
        color: 'white',
        padding: 7,
        borderRadius: 10
    },
    
    containerInformacoes: {
        backgroundColor: theme.COLORS.GRAY_600,
        color: theme.COLORS.GRAY_100,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderWidth: 0.5,
        // borderColor: theme.COLORS.GRAY_300,
        marginHorizontal: 20,
    },

    buttonConfiguracoes: {
        borderRadius: 7,
        backgroundColor: theme.COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },

    buttonHorario: {
        // width: 60,
        // height: 40,
        borderRadius: 7,
        backgroundColor: theme.COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
    },



    containerText: {
        color: theme.COLORS.GRAY_100,
        alignItems: 'center',
        fontSize: theme.FONT_SIZE.SM
    },

    container: {
        flex: 1,
        flexDirection: 'row',
    },

    button: {
        width: 60,
        height: 60,
        borderRadius: 7,
        backgroundColor: theme.COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
    },

})


