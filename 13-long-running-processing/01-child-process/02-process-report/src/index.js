import { fork } from 'node:child_process'
import { createReadStream } from 'node:fs'
import { Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import csvtojson from 'csvtojson'

const BACKGROUND_TASK = './src/backgroundTask.js'
const DATA_PATH = './data/All_Pokemon.csv'
const PROCESS_COUNT = 30

const childProcesses = new Map()
const replications = []

function createChildProcess () {
  const childProcess = fork(BACKGROUND_TASK, [DATA_PATH])
  childProcess.on('error', error => {
    console.error(`child process ${childProcess.pid} has an error`, error)
    process.exit(1)
  })
  childProcess.on('exit', () => {
    console.log(`child process ${childProcess.pid} has exited`)
    childProcesses.delete(childProcess.pid)
  })
  childProcess.on('message', message => {
    // work around for multiprocessing
    if (replications.includes(message)) return
    replications.push(message)
    console.log(`${message} is replicated`)
  })
  childProcesses.set(childProcess.pid, childProcess)
}

for (let i = 0; i < PROCESS_COUNT; i++) {
  createChildProcess()
}

function roundRoubin (array, index=0) {
  return function () {
    if (index >= array.length) {
      index = 0
    }
    return array[index++]
  }
}

// Connection pool or load balancer
const getProcess = roundRoubin([...childProcesses.values()])
console.log(`starting with ${childProcesses.size} processes`)

const writable = new Writable({
  write (chunk, encoding, callback) {
    const chosenProcess = getProcess()
    chosenProcess.send(JSON.parse(chunk))
    callback()
  }
})

await pipeline(
  createReadStream(DATA_PATH),
  csvtojson(),
  writable
)