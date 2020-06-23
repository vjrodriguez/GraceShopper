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
router.get('/', checkIfAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

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

router.put('/:id', async (req, res, next) => {
  try {
    const product = Product.findByPk(req.params.id)
    product.stock = req.body //?
    await product.save()
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
  try {
    const newAdmin = await User.findByPk(req.params.id)
    newAdmin.isAdmin = true
    newAdmin.save()
    await res.json(newAdmin)
  } catch (error) {
    next(error)
  }
})

module.exports = router
