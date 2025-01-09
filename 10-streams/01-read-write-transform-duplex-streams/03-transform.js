import { createWriteStream } from 'node:fs'
import { Readable, Transform, Writable } from 'node:stream'

const readable = new Readable({
  read () {
    for (let i = 0; i < 100; i++) {
      const person = {
        id: Date.now() + i,
        name: `Matheus-${i}`
      }
      const personString = JSON.stringify(person)
      this.push(personString)
    }
    this.push(null)
  }
})

const toCSV = new Transform({
  transform (chunk, encoding, callback) {
    const { id, name } = JSON.parse(chunk)
    const csvLine = `${id},${name.toUpperCase()}\n`
    callback(null, csvLine)
  }
})

const addHeader = new Transform({
  transform (chunk, encoding, callback) {
    this.counter = this.counter ?? 0
    if (this.counter) {
      return callback(null, chunk)
    }
    this.counter++
    callback(null, 'id,name\n'.concat(chunk))
  }
})

const writable = new Writable({
  write (chunk, encoding, callback) {
    console.log({ chunk: chunk.toString() })
    callback()
  }
})

const writeStream = createWriteStream('./persons.csv')

const pipeline = readable
  .pipe(toCSV)
  .pipe(addHeader)
  //.pipe(writable)
  //.pipe(process.stdout)
  .pipe(writeStream)

pipeline.on('finish', () => console.log('Pipeline finished'))