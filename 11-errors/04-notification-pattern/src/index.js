import { createServer } from 'node:http'
import { statusCodes } from './util/httpStatusCodes.js'
import HeroEntity from './heroEntity.js'

const PORT = 3000

async function requestListener (request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data)
      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('error connecting to database')
      }
      const hero = new HeroEntity(parsedData)
      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.write(hero.getNotifications())
        continue
      }
      response.writeHead(statusCodes.OK)
    }
    catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
    }
    finally {
      response.end()
    }
  }
}

function printListening () {
  console.log(`running at ${PORT}`)
}

createServer(requestListener).listen(PORT, printListening)