import ContextStrategy from './src/base/contextStrategy.js'
import MongoDBStrategy from './src/strategies/mongoDBStrategy.js'
import PostgresStrategy from './src/strategies/postgresStrategy.js'

const postgresConnectionString = 'postgres://kastorcode:12345@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = 'mongodb://kastorcode:12345@localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [
  {
    name: 'Matheus Ramalho de Oliveira',
    type: 'transaction'
  },
  {
    name: 'Naruto Uzumaki',
    type: 'activityLog'
  }
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}

for (const { name, type } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + ' ' + Date.now() })
  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}