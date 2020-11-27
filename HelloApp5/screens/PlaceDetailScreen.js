import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
const PlaceDetailScreen = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: props.route.params?.placeTitle
        });
    });
    return (
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
export default PlaceDetailScreen;