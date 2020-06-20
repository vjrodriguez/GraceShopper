const faker = require('faker')
faker.seed(123)
const productSeed = [
  {
    name: 'polish name',
    description:
      'a brief description of this product that lives up to the polishd brand',
    price: faker.random.number({
      min: 900,
      max: 1600
    }),
    colorFamily: faker.commerce.color(),
    stock: faker.random.number({
      min: 0,
      max: 1000
    }),
    imageUrl: faker.image.imageUrl()
  }
]

module.exports = productSeed
