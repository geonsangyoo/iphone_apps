import React, { useCallback, useLayoutEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';
const ListItem = props => {
    return <View style={ styles.listItem }>
        <DefaultText>{ props.children }</DefaultText>
    </View>
};
const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.route.params?.mealId;
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals).some(meal => meal.id === mealId);
    const mealTitle = props.route.params?.mealTitle;
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: mealTitle,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item
                        iconName={ currentMealIsFavorite ? "star" : "star-outline" }
                        title='Favorites'
                        onPress={ toggleFavoriteHandler }
                    />
                </HeaderButtons>
            )
        });
    });
    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={ styles.image } />
            <View style={ styles.details }>
                <DefaultText>{ selectedMeal.complexity.toUpperCase() }</DefaultText>
                <DefaultText>{ selectedMeal.duration }</DefaultText>
                <DefaultText>{ selectedMeal.affordability.toUpperCase() }</DefaultText>
            </View>
            <Text style={ styles.title }>Ingredients</Text>
            { selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ ingredient }>{ ingredient }</ListItem>
            ))}
            <Text style={ styles.title }>Steps</Text>
            { selectedMeal.steps.map(step => (
                <ListItem key={ step }>{ step }</ListItem>
            ))}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});
export default MealDetailScreen;