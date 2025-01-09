import http from 'node:http'
import { Readable } from 'node:stream'

const PORTS = [3000, 4000]

function requestListener1 (request, response) {
  // response.write('Test 01\n')
  // response.write('Test 02\n')
  // request.pipe(response)
  let count = 0
  const maxCount = 99
  const readable = new Readable({
    read () {
      const everySecond = intervalId => {
        if (count++ <= maxCount) {
          this.push(`{"id":${Date.now() + count},"name":"Matheus-${count}"}\n`)
          return
        }
        clearInterval(intervalId)
        this.push(null)
      }
      setInterval(() => {
        everySecond(this)
      }, 100)
    }
  })
  readable.pipe(response)
}

function requestListener2 (request, response) {
  let count = 0
  const maxCount = 99
  const readable = new Readable({
    read () {
      const everySecond = intervalId => {
        if (count++ <= maxCount) {
          this.push(`{"id":${Date.now() + count},"name":"Ramalho-${count}"}\n`)
          return
        }
        clearInterval(intervalId)
        this.push(null)
      }
      setInterval(() => {
        everySecond(this)
      }, 100)
    }
  })
  readable.pipe(response)
}

function printListening (index) {
  console.log(`server ${index + 1} running at ${PORTS[index]}`)
}

http.createServer(requestListener1).listen(PORTS[0], () => printListening(0))
http.createServer(requestListener2).listen(PORTS[1], () => printListening(1))