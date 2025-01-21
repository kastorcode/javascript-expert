import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { createServer } from 'node:http'
import { pipeline } from 'node:stream/promises'

const PORT = 3000

async function requestListener (request, response) {
  const fileName = `file-${randomUUID()}.csv`
  await pipeline(
    request,
    createWriteStream(fileName)
  )
  response.end('upload with success')
}

function printListening () {
  console.log(`running at ${PORT}`)
}

createServer(requestListener).listen(PORT, printListening)