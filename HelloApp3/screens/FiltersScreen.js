import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';
const FilterSwitch = props => {
    return (
        <View style={ styles.filterContainer }>
            <Text>{ props.label }</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                value={ props.state }
                onValueChange={ props.onChange }
            />
        </View>
    );
};
const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const dispatch = useDispatch();
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Filter Meals',
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
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName="save"
                        title='Save'
                        onPress={ saveFilters }
                    />
                </HeaderButtons>
            )
        });
    });
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch 
                label='Gluten-free' 
                state={ isGlutenFree } 
                onChange={ newValue => setIsGlutenFree(newValue) }
            />
            <FilterSwitch 
                label='Lactose-free' 
                state={ isLactoseFree } 
                onChange={ newValue => setIsLactoseFree(newValue) }
            />
            <FilterSwitch 
                label='Vegan' 
                state={ isVegan } 
                onChange={ newValue => setIsVegan(newValue) }
            />
            <FilterSwitch 
                label='Vegetarian' 
                state={ isVegetarian } 
                onChange={ newValue => setIsVegetarian(newValue) }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    }
});
export default FiltersScreen;