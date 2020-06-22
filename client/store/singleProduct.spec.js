/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getSingleProduct} from './singleProduct'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getSingleProduct', () => {
    it('eventually dispatches the SET_PRODUCT action', async () => {
      const name = 'Super Color Flashy Polish'
      const description = 'The flash that is gonna get you in the door!'
      const price = 1000000
      const colorFamily = 'red'
      const stock = 1
      const fakeProduct = {
        name,
        description,
        price,
        colorFamily,
        stock
      }
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
