import { createContext, useReducer } from 'react';

export const ProductContext = createContext();

const initialState = {
    cart: [],
    products: null,
    product: null
};

export const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                products: action.payload
            };
        case 'GET_PRODUCT':
            return {
                ...state,
                product: action.payload
            };
        case 'GET_FAVORITES':
            return {
                products: action.payload
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload._id
                        ? { ...product, favorites: product.favorites.filter(id => id !== action.payload.userId) }
                        : product
                ),
                product: state.product && state.product._id === action.payload._id
                    ? { ...state.product, favorites: state.product.favorites.filter(id => id !== action.payload.userId) }
                    : state.product
            };
        case 'ADD_FAVORITE':
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload._id
                        ? { ...product, favorites: [...product.favorites, action.payload.userId] }
                        : product
                ),
                product: state.product && state.product._id === action.payload._id
                    ? { ...state.product, favorites: [...state.product.favorites, action.payload.userId] }
                    : state.product
            };



        case 'GET_CART':
            return {
                ...state,
                cart: action.payload,
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== action.payload._id),
            };

        // case 'ADD_TO_CART':
        //     return {
        //         ...state,
        //         cart: [...state.cart, action.payload]
        //     };

        default:
            return state;
    }
};

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);
    console.log('ProductContext state:', state)
    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};
