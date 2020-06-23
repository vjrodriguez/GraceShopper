const faker = require('faker')
faker.seed(123)
const productSeed = []

const imageUrls = [
  '/1.JPEG',
  '/2.JPEG',
  '/3.JPEG',
  '/4.JPEG',
  '/5.JPEG',
  '/6.JPEG',
  '/7.JPEG',
  '/8.JPEG',
  '/9.JPEG',
  '/10.JPEG',
  '/11.JPEG',
  '/12.JPEG',
  '/13.JPEG',
  '/14.JPEG',
  '/15.JPEG',
  '/16.JPEG',
  '/17.JPEG',
  '/19.JPEG',
  '/20.JPEG',
  '/21.JPEG',
  '/22.JPEG'
]

for (let i = 0; i < 50; i++) {
  productSeed.push({
    name: faker.random.word() + ' ' + faker.commerce.color(),
    description:
      'a brief description of this product that represents the polishd brand',
    price: faker.random.number({
      min: 900,
      max: 1600
    }),
    colorFamily: faker.commerce.color(),
    stock: faker.random.number({
      min: 0,
      max: 1000
    }),
    imageUrl: faker.random.arrayElement(imageUrls)
  })
}

module.exports = productSeed
