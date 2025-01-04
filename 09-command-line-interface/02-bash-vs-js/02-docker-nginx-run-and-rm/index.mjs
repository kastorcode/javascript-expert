import { setTimeout } from 'node:timers/promises'
import safeRegex from 'safe-regex'

$.verbose = false

await $`docker run -p "8080:80" -d nginx`
await setTimeout(500)
const request = await $`curl --silent localhost:8080`
console.log('request.stdout\n', request.stdout)

const containers = await $`docker ps`
const expression = /(?<CONTAINER_ID>\w+)\W+(?=nginx)/

if (!safeRegex(expression)) {
  throw new Error('unsafe regex!')
}

const {groups:{CONTAINER_ID}} = containers.toString().match(expression)

const logs = await $`docker logs ${CONTAINER_ID}`
console.log('logs.stdout\n', logs.stdout)

const rm = await $`docker rm -f ${CONTAINER_ID}`
console.log('rm.stdout\n', rm.stdout)