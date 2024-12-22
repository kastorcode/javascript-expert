// curl -i localhost:3000

InjectHttpInterceptor()
import http from 'node:http'
import { InjectHttpInterceptor } from '../index.js'

const PORT = 3000

function requestListener (request, response) {
  response.end('Hello, World!\n')
}

const server = http.createServer(requestListener)
server.listen(PORT, () => console.log('server running at', server.address().port))