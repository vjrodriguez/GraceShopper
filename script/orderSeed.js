const faker = require('faker')
faker.seed(123)

const orderSeed = []

for (let i = 1; i < 21; i++) {
  orderSeed.push({
    userId: i,
    status: 'cart'
  })
}

module.exports = orderSeed
