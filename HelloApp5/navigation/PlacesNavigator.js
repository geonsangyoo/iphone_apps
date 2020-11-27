import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';

import Colors from '../constants/Colors';

const defaultStackOptions = {
    headerStyle: {
        backgroundColor: 'white'
    },
    headerTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerTintColor: Colors.primary
};
const PlacesNavigatorScreen = createStackNavigator();
const PlacesNavigator = () => {
    return (
        <PlacesNavigatorScreen.Navigator
            mode="card"
            screenOptions={defaultStackOptions}
        >
            <PlacesNavigatorScreen.Screen
                name="places"
                component={PlacesListScreen}
            />
            <PlacesNavigatorScreen.Screen
                name="placeDetail"
                component={PlaceDetailScreen}
            />
            <PlacesNavigatorScreen.Screen
                name="newPlace"
                component={NewPlaceScreen}
            />
            <PlacesNavigatorScreen.Screen
                name="map"
                component={MapScreen}
            />
        </PlacesNavigatorScreen.Navigator>
    );
};
const NavigationContainerApp = () => {
    return (
        <NavigationContainer>
            <PlacesNavigator />
        </NavigationContainer>
    );
}

export default NavigationContainerApp;