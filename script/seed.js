'use strict'
const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const userSeed = require('./userSeed')
const productSeed = require('./productSeed')
const orderSeed = require('./orderSeed')

const dummyUsers = [
  {
    firstName: 'Naomi',
    lastName: 'Ochoa',
    email: 'naomi@polishd.com',
    isAdmin: false,
    password: 'Naomi123!'
  },
  {
    firstName: 'Vicky',
    lastName: 'Rodriguez',
    email: 'vicky@polishd.com',
    isAdmin: false,
    password: 'Vicky123!'
  },
  {
    firstName: 'Irina',
    lastName: 'Gabuaeva',
    email: 'irina@polishd.com',
    isAdmin: false,
    password: 'irina123'
  },
  {
    firstName: 'Cody',
    lastName: 'Pug',
    email: 'cody@email.com',
    isAdmin: true,
    password: '12345!'
  },
  {
    firstName: 'Kate',
    lastName: 'Norton',
    email: 'kate@polishd.com',
    isAdmin: false,
    password: 'Kate123'
  }
]

const dummyProducts = [
  {
    name: 'lady like',
    description:
      'etiquette, posture, protocol. did we miss anything? oh, yes, this elegant soft mauve nail lacquer. this dainty darling is just the thing for a proper manicure.',
    price: 900,
    colorFamily: 'reds',
    stock: 20,
    imageUrl: '/9.JPEG'
  },
  {
    name: 'living legend',
    description:
      'recognized is your middle name in this longwear, rich risk-taking crimson – everyone will be vying for your cover photo. step 1: apply two coats of gel couture color.  step 2: apply gel couture top coat.',
    price: 1150,
    colorFamily: 'red',
    stock: 75,
    imageUrl: '/4.JPEG'
  },
  {
    name: 'the truth goddess',
    description:
      'you’re pretty tricky in a vibrant sapphire blue nail polish with a velvet matte finish. (matte)',
    price: 900,
    colorFamily: 'bluess',
    stock: 99,
    imageUrl: '/14.JPEG'
  },
  {
    name: 'dye-mentions',
    description:
      'all the angles. all the answers. there’s just no stopping this multifaceted, genius powder blue nail polish. step 1: apply two coats of gel couture color.  step 2: apply gel couture top coat.',
    price: 1150,
    colorFamily: 'greens',
    stock: 80,
    imageUrl: '/18.JPEG'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const fakerUsers = await User.bulkCreate(userSeed)
  const fakerProducts = await Product.bulkCreate(productSeed)
  const fakerOrders = await Order.bulkCreate(orderSeed)

  const users = await Promise.all(dummyUsers.map(user => User.create(user)))

  //const carts = await Promise.all(dummyCarts.map(cart => Cart.create(cart)))

  const products = await Promise.all(
    dummyProducts.map(product => Product.create(product))
  )
  const cody = await User.findOne({
    where: {
      firstName: 'Cody'
    }
  })
  const naomi = await User.findOne({
    where: {
      firstName: 'Naomi'
    }
  })
  const vicky = await User.findOne({
    where: {
      firstName: 'Vicky'
    }
  })
  const irina = await User.findOne({
    where: {
      firstName: 'Irina'
    }
  })

  const allPolish = await Product.findAll()
  const codysOrder = await cody.createOrder()

  await codysOrder.addProduct(allPolish[0])
  await codysOrder.addProduct(allPolish[1])
  await codysOrder.addProduct(allPolish[2])

  const naomisOrder = await naomi.createOrder()
  await naomisOrder.addProduct(allPolish[1])
  await naomisOrder.addProduct(allPolish[2])

  const vickysOrder = await vicky.createOrder()
  await vickysOrder.addProduct(allPolish[3])
  await vickysOrder.addProduct(allPolish[0])

  const irinasOrder = await irina.createOrder()
  await irinasOrder.addProduct(allPolish[3])
  await irinasOrder.addProduct(allPolish[4])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(
    `seeded ${fakerUsers.length} Faker users, ${
      fakerProducts.length
    } Faker products and ${fakerOrders.length} Faker orders!`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
