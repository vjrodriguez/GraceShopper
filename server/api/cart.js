const router = require('express').Router()
const {Cart} = require('../db/models')

//Get a user's cart
router.get('/:userId', async (req, res, next) => {
  try {
    const userCartItems = Cart.findAll({
      where: {userId: req.params.userId}
    })
    res.json(userCartItems)
  } catch (error) {
    next(error)
  }
})

//Update a user's cart to reflect a change in quantity OR that the item has been purchased
router.put('/:userId/:itemId', async (req, res, next) => {
  try {
    const [numOfUpdatedItems, updatedItem] = await Cart.upate(
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
// router.post('/:userId/:itemId', async (req, res, next) => {
//   try {
//     console.log('hi')
//   } catch (error) {
//     next(error)
//   }
// })
