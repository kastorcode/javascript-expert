import { Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import axios from 'axios'

const API = [
  'http://localhost:3000',
  'http://localhost:4000'
]

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API[0],
    responseType: 'stream'
  }),
  axios({
    method: 'get',
    url: API[1],
    responseType: 'stream'
  })
])

const streams = requests.map(({ data }) => data)

async function * writable (stream) {
  for await (const chunk of stream) {
    const name = chunk.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${chunk}`)
  }
}

// passthrough stream
async function * merge (streams) {
  for (const readable of streams) {
    // trabalha em object mode
    readable.setEncoding('utf8')
    for await (const chunk of readable) {
      const lines = chunk.trim().split(/\n/)
      for (const line of lines) {
        yield line
      }
    }
  }
}

await pipeline(
  merge(streams),
  writable
)