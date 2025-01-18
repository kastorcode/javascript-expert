import { randomBytes } from 'node:crypto'
import Events from 'node:events'
import { createServer } from 'node:http'

const PORT = 3000
const myEvent = new Events()

function getBytes () {
  return randomBytes(10000)
}

function onData () {
  getBytes()
  const items = []
  setInterval(() => items.push(Date.now()))
}

function requestListener (request, response) {
  myEvent.on('data', onData)
  myEvent.emit('data', Date.now())
  response.end('ok')
}

function printListening () {
  console.log(`running at ${PORT}`)
}

createServer(requestListener).listen(PORT, printListening)