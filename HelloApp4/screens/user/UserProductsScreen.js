import React, { useLayoutEffect } from 'react';
import { View, FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
const UserProductsScreen = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "User Products (Admin)",
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item 
                        title="Menu"
                        iconName="menu"
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                    <Item 
                        title="Add"
                        iconName="pencil-plus"
                        onPress={() => {
                            props.navigation.navigate('Edit Products')
                        }}
                    />
                </HeaderButtons>
            )
        });
    });
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        props.navigation.navigate('Edit Products', {
            productId: id
        });
    };
    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id));
            } }
        ]);
    };
    return (
        <FlatList
            scrollIndicatorInsets={{ right: 1 }}
            data={ userProducts }
            keyExtractor={ item => item.id }
            renderItem={ itemData => (
                <ProductItem 
                    image={ itemData.item.imageUrl }
                    title={ itemData.item.title }
                    price={ itemData.item.price }
                >
                    <Button
                        color={ Colors.primary }
                        title='Edit'
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    />
                    <Button
                        color={ Colors.primary }
                        title='Delete'
                        onPress={() => { 
                            deleteHandler(itemData.item.id); 
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};
export default UserProductsScreen;