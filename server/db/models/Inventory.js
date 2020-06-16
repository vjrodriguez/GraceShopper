const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
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
    type: Sequelize.STRING,
    allownull: false,
    validate: {
      notEmpty: true
    },
    defaultValue:
      'https://www.lacquester.com/wp-content/uploads/2017/03/EmptyBottleNew.png'
  }
})
module.exports = Inventory
