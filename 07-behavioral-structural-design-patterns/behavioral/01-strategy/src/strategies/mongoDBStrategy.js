import MongoDB from 'mongodb'

export default class MongoDBStrategy {

  #instance

  constructor (connectionString) {
    const { pathname: dbName } = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, '')
    this.dbName = dbName.replace(/\W/, '')
    this.collection = 'warriors'
  }

  async connect () {
    const client = new MongoDB.MongoClient(this.connectionString, {
      useUnifiedTopology: true
    })
    await client.connect()
    this.#instance = client.db(this.dbName).collection(this.collection)
  }

  async create (item) {
    return this.#instance.insertOne(item)
  }

  async read (item) {
    return this.#instance.find(item).toArray()
  }

}