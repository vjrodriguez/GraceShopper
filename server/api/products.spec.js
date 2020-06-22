/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const name = 'Super Color Flashy Polish'
    const description = 'The flash that is gonna get you in the door!'
    const price = 1000000
    const colorFamily = 'red'
    const stock = 1

    beforeEach(() => {
      return Product.create({
        name,
        description,
        price,
        colorFamily,
        stock
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(name)
    })
  }) // end describe('/api/products')

  describe('/api/product/', () => {
    const name = 'Super Color Flashy Polish'
    const description = 'The flash that is gonna get you in the door!'
    const price = 1000000
    const colorFamily = 'red'
    const stock = 1

    beforeEach(() => {
      return Product.create({
        name,
        description,
        price,
        colorFamily,
        stock
      })
    })

    it('GET /api/product/1', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.description).to.be.equal(description)
    })
  }) // end describe('/api/products')
}) // end describe('User routes')
