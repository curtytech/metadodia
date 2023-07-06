import { View } from 'react-native';

import theme from '../../theme';

export function Divider() {
    return (
        <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: theme.COLORS.GRAY_100, marginHorizontal: 30, marginVertical: 10  }} >
            
        </View>
    )
}