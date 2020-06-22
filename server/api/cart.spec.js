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
    const codysPassword = 'Cody123!'
    const firstName = 'Cody'
    const lastName = 'Dog'

    const codysCredentials = {
      userInfo: {email: codysEmail},
      password: codysPassword
    }

    const productName = 'Polish Name'
    const description = 'A cool polish'
    const price = 900
    const colorFamily = 'Blue'
    const stock = 10

    it('GET /api/cart fetches users exisitng active cart', async () => {
      const Cody = await User.create({
        email: codysEmail,
        password: codysPassword,
        firstName,
        lastName
      })

      const newProduct = await Product.create({
        name: productName,
        description,
        price,
        colorFamily,
        stock
      })
      const codysOrder = await Cody.createOrder()
      await codysOrder.addProduct(newProduct)

      let authenticatedCody = request.agent(app)

      await authenticatedCody
        .post('/auth/login')
        .send(codysCredentials)
        .expect(200)

      const res = await authenticatedCody.get('/api/cart').expect(200)

      expect(res.body.products).to.be.an('array')
      expect(res.body.products[0].name).to.be.equal(productName)

      expect(res.body.orderTotal).to.be.an('number')
      expect(res.body.orderTotal).to.be.equal(price)
    })
  }) // end describe('/api/cart')
}) // end describe('Cart routes')
