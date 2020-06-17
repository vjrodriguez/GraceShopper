const router = require('express').Router()
const {Inventory} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Inventory.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Inventory.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

//decrement inventory route here?

module.exports = router
