const { deepStrictEqual } = require('node:assert')
const rewiremock = require('rewiremock/node')

const dbData = [
  { name: 'Naruto' },
  { name: 'Sasuke' }
]

class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}

rewiremock(() => require('../src/util/database')).with({ Database: MockDatabase })

;(async () => {
  {
    const expected = [{ name: 'NARUTO' }, { name: 'SASUKE' }]
    rewiremock.enable()
    const { UserFactory } = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
    rewiremock.disable()
  }
  {
    const expected = [{ name: 'MATHEUS RAMALHO DE OLIVEIRA' }]
    const { UserFactory } = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
  }
})()