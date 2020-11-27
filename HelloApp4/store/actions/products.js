import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const fetchProducts = () => {
    return async dispatch => {
        try {
            // any async code
            const response = await fetch('https://dailybear-test1.firebaseio.com/products.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            const loadProducts = [];
            for (const key in resData) {
                loadProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    parseFloat(resData[key].price)
                ));
            }
            dispatch({ type: SET_PRODUCTS, products: loadProducts });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    };
};
export const deleteProduct = id => {
    return async dispatch => {
        // any aysnc code
        const response = await fetch(`https://dailybear-test1.firebaseio.com/products/${id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({
            type: DELETE_PRODUCT,
            pid: id
        });
    };
};
export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code
        const response = await fetch('https://dailybear-test1.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        const resData = await response.json();
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: parseFloat(price)
            }
        });
    };
};
export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        // any aysnc code
        const response = await fetch(`https://dailybear-test1.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title: title,
                description: description,
                imageUrl: imageUrl
            }
        });
    };
};