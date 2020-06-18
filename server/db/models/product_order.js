const Sequelize = require('sequelize')
const db = require('../db')

const Product_order = db.define('product_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  purchasedPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product_order
