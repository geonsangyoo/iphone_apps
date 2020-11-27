import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
const MealsNavigatorScreen = createStackNavigator();
const FavoritesNavigatorScreen = createStackNavigator();
const FiltersNavigatorScreen = createStackNavigator();
const MealsFavTabNavigator = createBottomTabNavigator();
const MealsDrawer = createDrawerNavigator();
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};
const MealsNavigator = () => {
    return (
        <MealsNavigatorScreen.Navigator
            mode='modal'
            screenOptions={defaultStackNavOptions}
        >
            <MealsNavigatorScreen.Screen
                name="Categories"
                component={CategoriesScreen}
            />
            <MealsNavigatorScreen.Screen
                name="CategoryMeals"
                component={CategoryMealsScreen}
            />
            <MealsNavigatorScreen.Screen name="MealDetailScreen" component={MealDetailScreen} />
        </MealsNavigatorScreen.Navigator>
    );
};
const FavoritesNavigator = () => {
    return (
        <FavoritesNavigatorScreen.Navigator
            mode='modal'
            screenOptions={defaultStackNavOptions}
        >
            <MealsNavigatorScreen.Screen
                name="Your Favorites"
                component={ FavoritesScreen }
            />
            <MealsNavigatorScreen.Screen
                name="MealDetailScreen"
                component={ MealDetailScreen }
            />
        </FavoritesNavigatorScreen.Navigator>
    );
};
const FiltersNavigator = () => {
    return (
        <FiltersNavigatorScreen.Navigator
            mode='modal'
            screenOptions={ defaultStackNavOptions }
        >
            <FiltersNavigatorScreen.Screen
                name="FiltersScreen"
                component={ FiltersScreen }
            />
        </FiltersNavigatorScreen.Navigator>
    );
};
const MealsTabNavigator = () => {
    return (
        <MealsFavTabNavigator.Navigator
            tabBarOptions={{
                showIcon: true,
                showLabel: true,
                activeTintColor: Colors.accentColor,
            }}
        >
            <MealsFavTabNavigator.Screen name="Meals" component={ MealsNavigator } options={{
                tabBarLabel: larbelInfo => {
                    return (
                        <Text style={{ fontSize: 12, color: larbelInfo.color, fontFamily: 'OpenSans-Regular' }}>
                            Meals
                        </Text>
                    );
                },
                tabBarIcon: tabInfo => <Icon name="restaurant-menu" style={{ marginTop: 5 }} color={ tabInfo.color } size={ tabInfo.size } />,
            }} />
            <MealsFavTabNavigator.Screen name="Favorites" component={ FavoritesNavigator } options={{
                tabBarLabel: larbelInfo => {
                    return (
                        <Text style={{ fontSize: 12, color: larbelInfo.color, fontFamily: 'OpenSans-Regular' }}>
                            Favorites
                        </Text>
                    );
                },
                tabBarIcon: tabInfo => <Icon name="stars" style={{ marginTop: 5 }} color={ tabInfo.color } size={ tabInfo.size } />,
            }} />
        </MealsFavTabNavigator.Navigator>
    );
};
export default function MyMealsNavigator() {
    return (
        <NavigationContainer>
            <MealsDrawer.Navigator 
                drawerType='slide'
                drawerContentOptions={{
                    activeTintColor: Colors.accentColor,
                }}
            >
                <MealsDrawer.Screen name="Meals" component={ MealsTabNavigator } options={{ 
                    drawerLabel: drawerInfo => {
                        return (
                            <Text style={{ fontSize: 16, color: drawerInfo.color }}>
                                Meals
                            </Text>
                        );
                    }
                }} />
                <MealsDrawer.Screen name="Filters" component={ FiltersNavigator } options={{
                    drawerLabel: drawerInfo => {
                        return (
                            <Text style={{ fontSize: 16, color: drawerInfo.color }}>
                                Filters
                            </Text>
                        );
                    }
                }} />
            </MealsDrawer.Navigator>
        </NavigationContainer>
    );
};