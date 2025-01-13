// curl -i -X POST -d "{}" localhost:3000
import http from 'node:http'

const PORT = 3000

let count = 1

function isEven (n) {
  return n % 2 === 0
}

async function requestListener (request, response) {
  count++
  try {
    if (isEven(count)) {
      await Promise.reject('error inside the request listener')
    }
    for await (const data of request) {
      if (!isEven(count)) {
        await Promise.reject('error inside the for await loop')
      }
    }
  }
  catch (error) {
    console.error('a server error has happened')
    console.error({ error })
    response.writeHead(500)
    response.write(JSON.stringify({
      message: 'Internal Server Error'
    }))
  }
  finally {
    response.end()
  }
}

function printListening () {
  console.log(`running at ${PORT}`)
}

http.createServer(requestListener).listen(PORT, printListening)