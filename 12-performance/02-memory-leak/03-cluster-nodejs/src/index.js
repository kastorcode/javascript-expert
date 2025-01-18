import cluster from 'node:cluster'
import { cpus } from 'node:os'
import { initServer } from './server.js'

(() => {

  // se não for o processo principal (o orquestrador), pode-se criar novos processos
  if (!cluster.isPrimary) {
    initServer()
    return
  }

  const cpusCount = cpus().length
  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking server for ${cpusCount} CPUs`)

  for (let i = 0; i < cpusCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code === 0 && worker.exitedAfterDisconnect) return
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })

})()