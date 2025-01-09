import { pipeline } from 'node:stream/promises'
import { setTimeout } from 'node:timers/promises'

async function * myCustomReadable () {
  yield Buffer.from('This is my')
  await setTimeout(100)
  yield Buffer.from('custom readable')
}

async function * myCustomTransform (stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_')
  }
}

async function * myCustomDuplex (stream) {
  let bytesRead = 0
  const wholeString = []
  for await (const chunk of stream) {
    bytesRead += chunk.length
    wholeString.push(chunk)
    console.log('[duplex writable]', chunk)
  }
  yield `wholeString ${wholeString.join()}`
  yield `bytesRead ${bytesRead}`
}

async function * myCustomWritable (stream) {
  for await (const chunk of stream) {
    console.log('[writable]', chunk)
  }
}

try {
  const abortController = new AbortController()
  // setImmediate(() => abortController.abort())
  const options = {
    signal: abortController.signal
  }
  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    options
  )
  console.log('Process has finished')
}
catch (error) {
  console.error({ error })
}