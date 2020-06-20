const router = require('express').Router()
const {Order, Product, Product_order} = require('../db/models')

//Helper functions

const setCurrentPrice = products => {
  products.forEach(async product => {
    console.log('running set current price')
    product.dataValues.product_order.dataValues.currentPrice = product.get(
      'price'
    )
    await product.save()
  })
}

const getOrderTotal = products => {
  let orderTotal = products.reduce((accum, currVal) => {
    return accum + currVal.get('product_order').get('productSubtotal')
  }, 0)
  return orderTotal
}

router.get('/', async (req, res, next) => {
  try {
    const userCartItems = await Order.findOne({
      where: {userId: req.user.dataValues.id, status: 'cart'},
      include: [
        {
          model: Product,
          attributes: {exclude: ['stock']}
        }
      ]
    })
    setCurrentPrice(userCartItems.products)

    const orderTotal = getOrderTotal(userCartItems.products)

    res.json({product: userCartItems.products, orderTotal: orderTotal})
  } catch (error) {
    next(error)
  }
})

//Update a user's order/cart to reflect a change in quantity OR that the item has been purchased
router.put('/', async (req, res, next) => {
  try {
    await Product_order.update(
      {
        quantity: req.body.quantity,
        status: req.body.status
      },
      {
        where: {orderId: req.body.orderId, productId: req.body.productId},
        returning: true,
        plain: true
      }
    )
    const updatedCartItems = await Order.findByPk(req.params.orderId, {
      include: Product
    })
    res.json(updatedCartItems)
  } catch (error) {
    next(error)
  }
})

//Remove an item from a user's cart
router.delete('/', async (req, res, next) => {
  try {
    await Product_order.destroy({
      where: {orderId: req.body.orderId, productId: req.body.productId}
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

//Add an item to a user's cart

//Will need to check that stock is not zero
router.post('/', async (req, res, next) => {
  try {
    const [order, wasCreated] = Order.findOrCreate({
      where: {userId: req.body.userId}
    })
    const newCartItem = await Product_order.create({
      orderId: order,
      inventoryId: req.body.itemId,
      quantity: req.body.quantity
    })
    res.json(newCartItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
