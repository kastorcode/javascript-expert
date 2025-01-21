import { createReadStream } from 'node:fs'
import { Transform, Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import csvtojson from 'csvtojson'

const TIMEOUT = 2000
const dataPath = process.argv[2]

let timeoutId = null

function stopTimeout () {
  clearTimeout(timeoutId)
}

function startTimeout () {
  timeoutId = setTimeout(() => {
    process.exit()
  }, TIMEOUT)
}

async function onMessage (message) {
  stopTimeout()
  const firstTimeRan = []
  const transform = new Transform({
    transform (chunk, encoding, callback) {
      const data = JSON.parse(chunk)
      if (data.Name !== message.Name) {
        return callback()
      }
      if (firstTimeRan.includes(message.Name)) {
        return callback(null, message.Name)
      }
      firstTimeRan.push(message.Name)
      callback()
    }
  })
  const writable = new Writable({
    write (chunk, encoding, callback) {
      if (chunk) {
        process.send(chunk.toString())
      }
      callback()
    }
  })
  await pipeline(
    createReadStream(dataPath),
    csvtojson(),
    transform,
    writable
  )
  startTimeout()
}

process.on('message', onMessage)
// console.log(`I am ready! ${dataPath}`)
startTimeout()