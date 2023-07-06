import { StyleSheet } from "react-native";
import theme from '../../theme/index';

export const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    backgroundColor: theme.COLORS.GRAY_600,
    padding: 12,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: theme.COLORS.GRAY_300,
    marginVertical: 5,
  },

  text: {
    color: theme.COLORS.GRAY_200,
    marginLeft: 7,
    flex:1
  },




})
