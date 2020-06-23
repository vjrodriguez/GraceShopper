const router = require('express').Router()
const {Product, User} = require('../db/models')

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

router.get('/users', checkIfAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/users/:id', checkIfAdmin, async (req, res, next) => {
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

module.exports = router
