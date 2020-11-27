import Order from '../../models/order';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const fetchOrders = () => {
    return async dispatch => {
        try {
            // any async code
            const response = await fetch('https://dailybear-test1.firebaseio.com/orders/u1.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            const loadOrders = [];
            for (const key in resData) {
                loadOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }
            dispatch({
                type: SET_ORDERS,
                orders: loadOrders
            })
        } catch(err) {
            throw err;
        }
    };
};
export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        // any async code
        const date = new Date();
        const response = await fetch('https://dailybear-test1.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        dispatch({
            type: ADD_ORDER,
            orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date }
        });
    };
};