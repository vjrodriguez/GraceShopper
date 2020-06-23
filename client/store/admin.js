import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const SET_USERS = 'SET_USERS'
const UPDATE_USER = 'UPDATE_USER'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

export const setUsers = users => ({
  type: SET_USERS,
  users
})

export const updateUser = user => ({
  type: UPDATE_USER,
  user
})

export const getProducts = () => async dispatch => {
  const {data} = await axios.get('/api/admin/products')
  dispatch(setProducts(data))
}

export const createProduct = newProduct => async dispatch => {
  const {data} = await axios.post('/api/admin/products', newProduct)
  dispatch(addProduct(data))
}

export const submitUpdate = updatedProduct => async dispatch => {
  const {data} = await axios.put(
    `/api/admin/products/${updatedProduct.id}`,
    updatedProduct
  )
  dispatch(updateProduct(data))
}

export const removeProduct = productId => async dispatch => {
  await axios.delete(`/api/admin/products/${productId}`)
  dispatch(deleteProduct(productId))
}

export const getUsers = () => async dispatch => {
  const {data} = await axios.get('/api/admin/users')
  dispatch(setUsers(data))
}

export const toggleAdmin = userId => async dispatch => {
  const {data} = await axios.put(`/api/admin/users/${userId}`)
  dispatch(updateUser(data))
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case UPDATE_PRODUCT: {
      let updatedProductList = state.products.map(product => {
        if (product.id === action.product.id) {
          return action.product
        } else {
          return product
        }
      })
      return {...state, products: updatedProductList}
    }
    case DELETE_PRODUCT: {
      let updatedProductList = state.products.filter(
        product => product.id !== action.productId
      )
      return {...state, products: updatedProductList}
    }
    case SET_USERS:
      return {...state, users: action.users}
    case UPDATE_USER: {
      let updatedUsersList = state.users.map(user => {
        if (user.id === action.user.id) {
          return action.user
        } else {
          return user
        }
      })
      return {...state, users: updatedUsersList}
    }
    default:
      return state
  }
}
