const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  purchasedPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  purchasedQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  orderNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  purchasedDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Order
