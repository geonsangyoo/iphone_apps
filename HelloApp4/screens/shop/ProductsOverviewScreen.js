import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { Text, View, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
const ProductOverviewScreen = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "All Products", 
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Cart"
                        iconName="cart-outline"
                        onPress={() => {
                            props.navigation.navigate('cart');
                        }}
                    />
                </HeaderButtons>
            )
        });
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    const loadProducts = useCallback(async () => {
        setError(null);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch, setIsLoading, setError]);
    const selectItemHandler = (id, title) => {
        props.navigation.navigate('detail', {
            productId: id,
            productTitle: title
        });
    };
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('focus', loadProducts);
        return willFocusSub;
    }, [loadProducts]);
    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);
    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured</Text>
                <Button title="Try Again" onPress={ loadProducts }/>
            </View>
        );
    }
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }
    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some something!</Text>
            </View>
        );
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isLoading}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ProductOverviewScreen;