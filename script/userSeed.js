const faker = require('faker')
faker.seed(123)
const userSeed = []

for (let i = 0; i < 100; i++) {
  userSeed.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past(16),
    address: faker.address.streetAddress('###'),
    country: faker.address.country(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    isAdmin: faker.random.boolean(),
    password: '000'
  })
}

module.exports = userSeed
