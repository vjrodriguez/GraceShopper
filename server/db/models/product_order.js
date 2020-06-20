const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Product_order = db.define('product_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  purchasedPrice: {
    type: Sequelize.INTEGER
  },
  currentPrice: {
    type: Sequelize.INTEGER
  },
  productSubtotal: {
    type: Sequelize.VIRTUAL,
    get() {
      const purchasedPrice = this.getDataValue('purchasedPrice')
      return purchasedPrice
        ? purchasedPrice * this.getDataValue('quantity')
        : this.getDataValue('currentPrice') * this.getDataValue('quantity')
    }
  }
})

module.exports = Product_order
