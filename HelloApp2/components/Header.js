import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Color from '../constants/color';
const Header = props => {
    return (
        <View style={ styles.header }>
            <Text style={ styles.headerTitle }>{ props.title }</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Color.head,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: Color.title,
        fontSize: 18,
    }
});
export default Header;