import { createServer } from 'node:http'
import { promisify } from 'node:util'
import { MongoClient } from 'mongodb'

const PORT = 3000

async function dbConnect () {
  const mongoClient = new MongoClient('mongodb://localhost:27017')
  await mongoClient.connect()
  console.log('MongoDB is connected')
  const db = mongoClient.db('comics')
  return {
    mongoClient,
    collections: {
      heroes: db.collection('heroes')
    }
  }
}

const { collections, mongoClient } = await dbConnect()

async function requestListener (request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString()
      })
      const heroes = await collections.heroes.find().toArray()
      response.writeHead(200)
      response.write(JSON.stringify(heroes))
    }
    catch (error) {
      console.error('a request error has happened')
      console.error(error)
      response.writeHead(500)
      response.write(JSON.stringify({
        message: 'Internal Server Error'
      }))
    }
    finally {
      response.end()
    }
  }
}

function printListening () {
  console.log(`Running at ${PORT} and process ${process.pid}`)
}

const server = createServer(requestListener).listen(PORT, printListening)

async function onSignalReceived (signal) {
  console.info(`\n${signal} signal received`)
  console.log('Closing HTTP server')
  await promisify(server.close.bind(server))()
  console.log('HTTP server has closed')
  console.log('Closing MongoDB connection')
  await mongoClient.close()
  console.log('MongoDB connection has closed')
  // 0 is success, 1 is error
  process.exit(0)
}

// SIGINT  -> Ctrl + C stop command
// SIGTERM -> OS kill command
const signals = ['SIGINT', 'SIGTERM']

signals.forEach(signal => process.on(signal, onSignalReceived))