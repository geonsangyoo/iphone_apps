import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButton';
import CategoryGridTile from '../components/CategoryGridTile';
const CategoriesScreen = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Meal Categories',
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item 
                        iconName="menu"
                        title='Menu'
                        onPress={ () => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        });
    });
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={ itemData.item.title }
                color={ itemData.item.color }
                onSelect={ () => {
                    props.navigation.navigate('CategoryMeals', {
                        categoryId: itemData.item.id
                    });
                }}
            />
        );
    };
    return (
        <FlatList
            keyExtractor={ (item, index) => item.id }
            data={ CATEGORIES }
            renderItem={ renderGridItem }
            numColumns={2}
        />
    );
};
export default CategoriesScreen;