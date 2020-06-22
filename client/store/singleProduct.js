import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'

export const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

export const getSingleProduct = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(setProduct(data))
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {product: action.product}

    default:
      return state
  }
}
