const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchasedDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('cart', 'completed'),
    defaultValue: 'cart'
  }
})

module.exports = Order
