/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {User, Order, Product, Product_order} = require('../db/models')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    const codysEmail = 'cody@puppybook.com'
    const firstName = 'Cody'
    const lastName = 'Dog'

    const productName = 'Polish Name'
    const description = 'A cool polish'
    const price = 900
    const colorFamily = 'Blue'
    const stock = 10

    beforeEach(async () => {
      const Cody = await User.create({
        email: codysEmail,
        firstName,
        lastName
      })
      const Product = await Product.create({
        productName,
        description,
        price,
        colorFamily,
        stock
      })
      const codysOrder = await Cody.createOrder()
      const req = {}
      req.user = Cody
    })

    it('GET /api/cart fetches users exisitng active cart', async () => {
      const res = await request(app)
        .post('/api/cart')
        .expect(200)
    })
  }) // end describe('/api/cart')
}) // end describe('Cart routes')
