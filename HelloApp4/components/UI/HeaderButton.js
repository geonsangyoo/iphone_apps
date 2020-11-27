import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomHeaderButton = props => {
    return <HeaderButton 
                { ...props }
                IconComponent={ Icon }
                iconSize={23}
                color='white'
            />;
};
export default CustomHeaderButton;