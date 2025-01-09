// ls | grep package | xargs cat | jq .name

// process.stdin.pipe(process.stdout)
//   .on('data', buffer => console.log('buffer:', buffer))
//   .on('error', error => console.error('error:', error))
//   .on('end', () => console.log('end'))
//   .on('close', () => console.log('close'))

// Terminal 1
// node -e "require('node:net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"
// Terminal 2
// node -e "process.stdin.pipe(require('node:net').connect(1338))"

// Gera um arquivo big.file de 1GB
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'node:http'
import { createReadStream, readFileSync } from 'node:fs'
const PORT = 3000
function requestListener (request, response) {
  // Vai quebrar
  // const bigFile = readFileSync('./big.file').toString()
  // response.write(bigFile)
  // return response.end()

  // Manda aos poucos
  createReadStream('./big.file').pipe(response)
}
function printListening () {
  console.log(`running at ${PORT}`)
}
http.createServer(requestListener).listen(PORT, printListening)
// curl localhost:3000 -o output.txt