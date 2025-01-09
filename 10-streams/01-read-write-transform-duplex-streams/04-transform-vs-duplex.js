import { Duplex, Transform } from 'node:stream'

let count = 0

const server = new Duplex({
  objectMode: true,
  encoding: 'utf-8',
  read () {
    const everySecond = intervalId => {
      if (count++ <= 5) {
        this.push(`My name is Matheus[${count}]\n`)
        return
      }
      clearInterval(intervalId)
      this.push(null)
    }
    setInterval(() => {
      everySecond(this)
    }, 100)
  },
  write (chunk, encoding, callback) {
    console.log('[writable] saving:', chunk)
    callback(null, chunk)
  }
})

const toUpperCase = new Transform({
  objectMode: true,
  transform (chunk, encoding, callback) {
    callback(null, chunk.toUpperCase())
  }
})
// O Transform é um duplex, mas não possui comunicação independente
toUpperCase.write('[transform] write')
// O push ignora o método transform
toUpperCase.push('[transform] push')

// Provar que são canais de comunicação diferentes
// write aciona o writable do Duplex
server.write('[duplex] this is a writable')

// on data = recebe os dados do this.push do readable
server.on('data', chunk => console.log(`[readable] ${chunk}`))

// push permite enviar mais dados
server.push('[duplex] this is also a readable\n')

server.pipe(process.stdout)

// redireciona os dados de readable para writable da duplex
server
  .pipe(toUpperCase)
  .pipe(server)