import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const getProducts = () => async dispatch => {
  const {data} = await axios.get('/api/admin/products')
  dispatch(setProducts(data))
}

export const createProduct = newProduct => async dispatch => {
  const {data} = await axios.post('/api/admin/products', newProduct)
  dispatch(addProduct(data))
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {products: action.products}

    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    default:
      return state
  }
}
