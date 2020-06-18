const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  colorFamily: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue:
      'https://www.lacquester.com/wp-content/uploads/2017/03/EmptyBottleNew.png'
  }
})
module.exports = Product
