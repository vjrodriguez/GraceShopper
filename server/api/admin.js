const router = require('express').Router()
const {Product, User} = require('../db/models')

router.get('/admin', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('admin/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.post('/admin', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/admin/:id', async (req, res, next) => {
  try {
    const product = Product.findByPk(req.params.id)
    product.stock = req.body //?
    await product.save()
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/admin/:id', async (req, res, next) => {
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

router.put('/admin/:id', async (req, res, next) => {
  try {
    const newAdmin = await User.findByPk(req.params.id)
    newAdmin.isAdmin = true
    newAdmin.save()
    await res.json(newAdmin)
  } catch (error) {
    next(error)
  }
})
