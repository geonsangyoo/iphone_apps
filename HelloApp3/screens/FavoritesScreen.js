import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
const FavroitesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Your Favorites',
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName="menu"
                        title='Menu'
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        });
    });
    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={ styles.content }>
                <DefaultText>No favorite meals found. Start adding some!!</DefaultText>
            </View>
        );
    } else {
        return <MealList
            list={ favMeals }
            navigation={ props.navigation }
        />;
    }
};
const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default FavroitesScreen;