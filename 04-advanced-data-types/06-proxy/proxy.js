'use strict'

const Event = require('node:events')

const event = new Event()
const eventName = 'counter'

event.on(eventName, message => {
  console.log(message)
})

const myCounter = { counter: 0 }
const proxy = new Proxy(myCounter, {
  get: (target, key) => {
    console.log(`get ${key}: ${target[key]}`)
    return target[key]
  },
  set: (target, key, value) => {
    event.emit(eventName, { value, key: target[key] })
    target[key] = value
    return true
  }
})

setInterval(function () {
  console.log('[3] setInterval')
  proxy.counter++
  if (proxy.counter === 10) clearInterval(this)
}, 500)

setTimeout(function () {
  console.log('[2] setTimeout')
  proxy.counter = 5
}, 100)

setImmediate(function () {
  console.log('[1] setImmediate')
})

process.nextTick(() => {
  console.log('[0] nextTick')
  proxy.counter = 9
})