import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
const CartScreen = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Your Cart'
        });
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    };
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size='small' color={Colors.primary} />
                ) : (
                        <Button
                            color={Colors.accent}
                            title="Order Now"
                            disabled={cartItems.length === 0}
                            onPress={sendOrderHandler}
                        />
                    )
                }
            </Card>
            <FlatList data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});
export default CartScreen;