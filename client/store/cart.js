import axios from 'axios'

//ACTION TYPES
const SET_CART = 'SET_CART'

//INITIAL STATE
const emptyCart = {}

//ACTION CREATORS
const setCart = cart => ({
  type: SET_CART,
  products: cart.products,
  orderTotal: cart.orderTotal
})

//THUNK CREATORS
export const addToCart = (path, newProduct) => async dispatch => {
  try {
    await axios.post(path, newProduct)
  } catch (error) {
    console.log(error)
  }
}

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
    await axios.put('/api/cart', newQty)
  } catch (error) {
    console.error(error)
  }
}

export const removeProduct = (orderId, productId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${orderId}/${productId}`)
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
    default:
      return state
  }
}
