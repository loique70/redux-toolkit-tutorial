 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartitems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-project'

//appel  d'un api

const initialState = {
    cartItems: [],
    amount:4, 
    total:0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url)
            .then(resp => resp.json())
            .catch(error => console.log(error))
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart : (state) => {
            state.cartItems = []
        },
        revomeItem : (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
        },
        increseItem : (state, {payload}) => {
            const cartItem = state.cartItems.find(item => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },
        decreseItem : (state, {payload}) => {
            const cartItem = state.cartItems.find(item => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals : (state) => {
            let amount = 0 
             let total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },

    //Les actions du reducer de l'api

    extraReducers : {
        [getCartItems.pending] : (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled] : (state, action) => {
            console.log(action)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected] : (state) => {
            state.isLoading = false
        }
    }
})

export const { clearCart, revomeItem, increseItem, decreseItem, calculateTotals  } = cartSlice.actions
export default cartSlice.reducer
