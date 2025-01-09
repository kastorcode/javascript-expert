import { PassThrough, Writable } from 'node:stream'
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

const results = requests.map(({ data }) => data)

const writable = new Writable({
  write (chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/, '')
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  }
})

function merge (streams) {
  return streams.reduce((previous, current, index, items) => {
    // impede que o stream se feche
    current.pipe(previous, { end: false })
    current.on('end', () => items.every(stream => stream.ended) && previous.end())
    return previous
  }, new PassThrough())
}

merge(results).pipe(writable)

// results[0].pipe(writable)
// results[1].pipe(writable)