import { parentPort } from 'node:worker_threads'
import axios from 'axios'
import sharp from 'sharp'

async function downloadImage (url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return response.data
}

async function onMessage ({ bg, fg }) {
  const fgBuffer = await sharp(await downloadImage(fg))
    .resize(null, 540)
    .toBuffer()
  const bgBuffer = await sharp(await downloadImage(bg))
    .composite([{
      input: fgBuffer, gravity: sharp.gravity.south
    }])
    .toBuffer()
  parentPort.postMessage(bgBuffer.toString('base64'))
}

parentPort.on('message', onMessage)