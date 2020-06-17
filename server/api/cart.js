const router = require('express').Router()
const {Cart, Inventory, User} = require('../db/models')

//Get a user's cart
router.get('/:userId', async (req, res, next) => {
  try {
    const userCartItems = await User.findAll({
      where: {id: req.params.userId},
      include: Inventory
    })
    res.json(userCartItems)
  } catch (error) {
    next(error)
  }
})

//Update a user's cart to reflect a change in quantity OR that the item has been purchased
router.put('/:userId/:itemId', async (req, res, next) => {
  try {
    const [numOfUpdatedItems, updatedItem] = await Cart.update(
      {
        quantity: req.body.quantity,
        status: req.body.status
      },
      {
        where: {userId: req.params.userId, inventoryId: req.params.itemId},
        returning: true,
        plain: true
      }
    )
    res.json(updatedItem)
  } catch (error) {
    next(error)
  }
})

//Remove an item from a user's cart
router.delete('/:userId/:itemId', async (req, res, next) => {
  try {
    const removedItem = await Cart.destroy({
      where: {userId: req.params.userId, inventoryId: req.params.itemId}
    })
    res.json(removedItem)
  } catch (error) {
    next(error)
  }
})

//Add an item to a user's cart

//Will need to check that stock is not zero
router.post('/:userId/:itemId', async (req, res, next) => {
  try {
    const newCartItem = await Cart.create({
      userId: req.params.userId,
      inventoryId: req.params.itemId,
      quantity: req.body.quantity
    })
    res.json(newCartItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
