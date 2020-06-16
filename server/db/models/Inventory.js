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
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})
module.exports = Inventory
