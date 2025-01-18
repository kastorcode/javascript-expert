import { appendFile } from 'node:fs/promises'
import { createServer } from 'node:http'

export function initServer () {

  const PORT = 3000
  const LOG_PATH = './log.log'

  async function requestListener (request, response) {
    await appendFile(LOG_PATH, `processed by ${process.pid}\n`)
    const result = Array.from({ length: 1e3 }, () => Math.floor(Math.random() * 40))
      .reduce((previous, next) => previous + next, 0)
    response.end(`${result}\n`)
  }

  function printListening () {
    console.log(`server running at ${PORT} and pid ${process.pid}`)
  }

  createServer(requestListener).listen(PORT, printListening)

  setTimeout(() => process.exit(1), Math.random() * 1e4)

}