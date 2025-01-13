import { createServer } from 'node:http'
import BusinessError from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCodes.js'

const PORT = 3000

function validateHero (hero) {
  if (hero.age < 20)
    throw new BusinessError('age must be higher than 20')
  if (hero.name?.length < 4)
    throw new BusinessError('name length must be higher than 4')
  // simulando erro de banco de dados
  if (Reflect.has(hero, 'connectionError'))
    throw new Error('error connecting to database')
}

async function requestListener (request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      validateHero(hero)
      response.writeHead(statusCodes.OK)
    }
    catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.write(error.message)
        continue
      }
      else {
        response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
      }
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