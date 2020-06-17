'use strict'
const db = require('../server/db')
const {User, Cart, Inventory} = require('../server/db/models')

const dummyUsers = [
  {
    firstName: 'Naomi',
    lastName: 'Ochoa',
    email: 'naomi@polishd.com',
    isAdmin: false,
    password: 'Naomi123'
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
  }
]

const dummyCarts = [
  {quantity: 3, status: 'active'},
  {quantity: 3, status: 'inactive'},
  {quantity: 3, status: 'active'}
]

const dummyInventories = [
  {
    name: 'lady like',
    description:
      'etiquette, posture, protocol. did we miss anything? oh, yes, this elegant soft mauve nail lacquer. this dainty darling is just the thing for a proper manicure.',
    price: 9.0,
    colorFamily: 'reds',
    stock: 20
  },
  {
    name: 'living legend',
    description:
      'recognized is your middle name in this longwear, rich risk-taking crimson – everyone will be vying for your cover photo. step 1: apply two coats of gel couture color.  step 2: apply gel couture top coat.',
    price: 11.5,
    colorFamily: 'red',
    stock: 75
  },
  {
    name: 'wild card',
    description:
      'you’re pretty tricky in a vibrant sapphire blue nail polish with a velvet matte finish. (matte)',
    price: 9.0,
    colorFamily: 'bluess',
    stock: 99
  },
  {
    name: 'dye-mentions',
    description:
      'all the angles. all the answers. there’s just no stopping this multifaceted, genius powder blue nail polish. step 1: apply two coats of gel couture color.  step 2: apply gel couture top coat.',
    price: 11.5,
    colorFamily: 'greens',
    stock: 80
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all(dummyUsers.map(user => User.create(user)))

  //const carts = await Promise.all(dummyCarts.map(cart => Cart.create(cart)))

  const inventories = await Promise.all(
    dummyInventories.map(inventory => Inventory.create(inventory))
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

  const allPolish = await Inventory.findAll()
  await cody.addInventory(allPolish[0])
  await cody.addInventory(allPolish[1])
  await cody.addInventory(allPolish[2])
  await naomi.addInventory(allPolish[1])
  await naomi.addInventory(allPolish[2])
  await vicky.addInventory(allPolish[3])
  await vicky.addInventory(allPolish[0])
  await irina.addInventory(allPolish[3])
  await irina.addInventory(allPolish[4])

  console.log(`seeded ${users.length} users`)
  //console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${inventories.length} inventories`)
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
