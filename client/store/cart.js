import axios from 'axios'

//ACTION TYPES
const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'

//INITIAL STATE
const emptyCart = {}

//ACTION CREATORS
const setCart = cart => ({
  type: SET_CART,
  products: cart.products,
  orderTotal: cart.orderTotal
})

const updateCart = cart => ({
  type: UPDATE_CART,
  products: cart.products,
  orderTotal: cart.orderTotal
})

//THUNK CREATORS
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart`)
    dispatch(setCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateQty = newQty => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart', newQty)
    dispatch(updateCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeProduct = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${productId}`)
    dispatch(updateCart(data))
  } catch (error) {
    console.error(error)
  }
}

export default function cartReducer(state = emptyCart, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        products: action.products,
        orderTotal: action.orderTotal
      }
    case UPDATE_CART:
      return {
        ...state,
        products: action.products,
        orderTotal: action.orderTotal
      }
    default:
      return state
  }
}
