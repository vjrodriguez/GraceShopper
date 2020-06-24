const router = require('express').Router()
const {Product, User, Product_order} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getTotalRev = orders => {
  let totalRev = orders.reduce((accum, currVal) => {
    return accum + currVal.get('productSubtotal')
  }, 0)
  return totalRev
}

const getTotalQty = orders => {
  let totalQty = orders.reduce((accum, currVal) => {
    return accum + currVal.get('quantity')
  }, 0)
  return totalQty
}

const checkIfAdmin = (req, res, next) => {
  if (req.user === undefined || !req.user.isAdmin) {
    const error = new Error('illegal action')
    error.status = 401
    return next(error)
  }
  next()
}

router.get('/products', checkIfAdmin, async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.post('/products', checkIfAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/products/:id', checkIfAdmin, async (req, res, next) => {
  try {
    const [numUpdatedProducts, updatedProduct] = await Product.update(
      req.body,
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/products/:id', checkIfAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/users/:id', async (req, res, next) => {
  try {
    const updatedUser = await User.findByPk(req.params.id)
    updatedUser.isAdmin
      ? (updatedUser.isAdmin = false)
      : (updatedUser.isAdmin = true)
    await updatedUser.save()
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.get('/stats', checkIfAdmin, async (req, res, next) => {
  try {
    const productOrders = await Product_order.findAll({
      where: {
        purchasedPrice: {[Op.ne]: null}
      }
    })

    const totalRev = getTotalRev(productOrders)

    const totalQty = getTotalQty(productOrders)

    res.send({totalRev, totalQty})
  } catch (error) {
    next(error)
  }
})

module.exports = router
