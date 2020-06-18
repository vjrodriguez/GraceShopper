const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Product_order = require('./product_order')

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: Product_order})
Product.belongsToMany(Order, {through: Product_order})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Order,
  Product_order,
  Product
}
