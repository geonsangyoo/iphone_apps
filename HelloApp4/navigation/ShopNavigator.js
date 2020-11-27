import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerTintColor: 'white'
};
const ProductsNavigatorScreen = createStackNavigator();
const ProductsNavigator = () => {
    return (
        <ProductsNavigatorScreen.Navigator
            mode='card'
            screenOptions={ defaultStackNavOptions }
        >
            <ProductsNavigatorScreen.Screen
                name='overview'
                component={ ProductOverviewScreen }
            />
            <ProductsNavigatorScreen.Screen
                name='detail'
                component={ ProductDetailScreen }
            />
            <ProductsNavigatorScreen.Screen
                name='cart'
                component={ CartScreen }
            />
        </ProductsNavigatorScreen.Navigator>
    );
};
const OrdersNavigatorScreen = createStackNavigator();
const OrdersNavigator = () => {
    return (
        <OrdersNavigatorScreen.Navigator
            mode='card'
            screenOptions={ defaultStackNavOptions }
        >
            <OrdersNavigatorScreen.Screen
                name='Order items'
                component={ OrdersScreen }
            />
        </OrdersNavigatorScreen.Navigator>
    );
};
const AdminNavigatorScreen = createStackNavigator();
const AdminNavigator = () => {
    return (
        <AdminNavigatorScreen.Navigator
            mode='card'
            screenOptions={ defaultStackNavOptions }
        >
            <AdminNavigatorScreen.Screen
                name='User Products'
                component={ UserProductsScreen }
            />
            <AdminNavigatorScreen.Screen
                name='Edit Products'
                component={ EditProductsScreen }
            />
        </AdminNavigatorScreen.Navigator>
    );
};
const ShopDrawer = createDrawerNavigator();
const ShopContainer = () => {
    return (
        <NavigationContainer>
            <ShopDrawer.Navigator
                drawerType='slide'
                drawerContentOptions={{
                    activeTintColor: Colors.primary
                }}
            >
                <ShopDrawer.Screen 
                    name="Products"
                    component={ ProductsNavigator }
                    options={{
                        drawerLabel: drawerInfo => {
                            return (
                                <Text style={{ fontSize: 16, color: drawerInfo.color }}>
                                    Products
                                </Text>
                            );
                        },
                        drawerIcon: drawerInfo => {
                            return (
                                <Icon
                                    name='menu-open'
                                    size={ drawerInfo.size }
                                    color={ drawerInfo.color }
                                />
                            );
                        }
                    }}
                />
                <ShopDrawer.Screen 
                    name="Orders"
                    component={ OrdersNavigator }
                    options={{
                        drawerLabel: drawerInfo => {
                            return (
                                <Text style={{ fontSize: 16, color: drawerInfo.color }}>
                                    Orders
                                </Text>
                            );
                        },
                        drawerIcon: drawerInfo => {
                            return (
                                <Icon
                                    name='cart-arrow-right'
                                    size={ drawerInfo.size }
                                    color={ drawerInfo.color }
                                />
                            );
                        }
                    }}
                />
                <ShopDrawer.Screen 
                    name="Admin"
                    component={ AdminNavigator }
                    options={{
                        drawerLabel: drawerInfo => {
                            return (
                                <Text style={{ fontSize: 16, color: drawerInfo.color }}>
                                    Admin
                                </Text>
                            );
                        },
                        drawerIcon: drawerInfo => {
                            return (
                                <Icon
                                    name='shopping'
                                    size={ drawerInfo.size }
                                    color={ drawerInfo.color }
                                />
                            );
                        }
                    }}
                />
            </ShopDrawer.Navigator>
        </NavigationContainer>
    );
};
export default ShopContainer;