import { Readable, Writable } from 'node:stream'

const readable = new Readable({
  read () {
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')
    this.push(null)
  }
})

const writable = new Writable({
  write (chunk, encoding, callback) {
    console.log({ chunk: chunk.toString() })
    callback()
  }
})

readable
  // .pipe(process.stdout)
 .pipe(writable)