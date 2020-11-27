import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
const CategoryMealsScreen = props => {
    const catId = props.route.params?.categoryId;
    const availableMeals = useSelector(state => state.meals.filteredMeals)
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: selectedCategory.title
        });
    });
    if (displayedMeals.length === 0) {
        return (
            <View style={ styles.content }>
                <DefaultText>No meals applicable is found through your filters, please check your filters!</DefaultText>
            </View>
        );
    }
    return (
        <MealList
            list={displayedMeals}
            navigation={props.navigation}
        />
    );
};
const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default CategoryMealsScreen;