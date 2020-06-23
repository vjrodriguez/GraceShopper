import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './products'
import productReducer from './singleProduct'
import cartReducer from './cart'
import adminReducer from './admin'

const reducer = combineReducers({
  user: user,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  admin: adminReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
