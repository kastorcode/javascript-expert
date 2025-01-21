import { createServer } from 'node:http'
import { dirname } from 'node:path'
import { fileURLToPath, parse } from 'node:url'
import { Worker } from 'node:worker_threads'
// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp'

const CURRENT_FOLDER = dirname(fileURLToPath(import.meta.url))
const PORT = 3000
const WORKER_FILENAME = 'worker.js'

async function joinImages (images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${CURRENT_FOLDER}/${WORKER_FILENAME}`)
    worker.once('error', reject)
    worker.once('exit', code => {
      if (code === 0) {
        console.log(`Thread ${worker.threadId} exited`)
        return resolve()
      }
      const error = new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
      return reject(error)
    })
    worker.once('message', resolve)
    worker.postMessage(images)
  })
}

async function requestListener (request, response) {
  if (!request.url.includes('joinImages')) {
    return response.end('ok')
  }
  const { query: { bg, fg } } = parse(request.url, true)
  const imageBase64 = await joinImages({ bg, fg })
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(`<img
    src="data:image/png;base64,${imageBase64}"
    style="display:flex;justify-self:center;max-height:100%;max-width:100%;"
  />`)
}

function printListening () {
  console.log(`running at ${PORT}`)
}

createServer(requestListener).listen(PORT, printListening)