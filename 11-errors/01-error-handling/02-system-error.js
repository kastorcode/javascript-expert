import { setTimeout as setTimeoutAsync } from 'node:timers/promises'

const delay = 1000
const shorterDelay = 100

// async function getDouble (item) {
//   console.log('starting process')
//   await setTimeoutAsync(shorterDelay)
//   console.log('item:', item)
//   console.log(await Promise.resolve('timeout order'))
//   await setTimeoutAsync(shorterDelay)
//   console.count('debug')
//   return parseInt(item) * 2
// }

// const results = ['1', '2'].map(getDouble)
// console.log('results:', await Promise.all(results))

async function printStarting () {
  console.log('starting process')
  await setTimeoutAsync(shorterDelay)
  console.count('debug')
  console.log(await Promise.resolve('timeout order'))
  await setTimeoutAsync(shorterDelay)
  console.count('debug')
  await Promise.reject('promise rejected inside the timeout')
}

function errorListener (error) {
  console.error('errorListener')
  console.error({ error })
  // process.exit(1)
}

function throwError (message) {
  throw new Error(message)
}

try {
  console.log('hello')
  console.log('world')
  throwError('error inside the try block')
}
catch (error) {
  console.error('error caught in catch')
  console.error({ error })
}
finally {
  console.log('executed after all')
}

process.on('unhandledRejection', errorListener)

process.on('uncaughtException', errorListener)

setTimeout(printStarting, delay)

Promise.reject('top scope promise rejected')

// se o Promise.reject estiver dentro de outro contexto, ele cai no unhandledRejection
setTimeout(async () => {
  await Promise.reject('top scope await promise rejected')
})
// mas se ele estiver no contexto global, ele cai no uncaughtException
// await Promise.reject('top scope await promise rejected')

throwError('top scope threw error')