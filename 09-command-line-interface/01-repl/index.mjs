// curl "localhost:3000/?salary=3000&discount=15"
import http from 'node:http'

const PORT = 3000

function netSalary ({ discount, salary }) {
  const percent = discount / 100
  const cost = salary * percent
  const result = salary - cost
  return result
}

function requestListener (request, response) {
  const url = request.url.replace('/', '')
  const params = new URLSearchParams(url)
  const data = Object.fromEntries(params)
  const result = netSalary(data)
  return response.end(`O seu salário final é: ${result}\n\n`)
}

http.createServer(requestListener)
  .listen(PORT, () => console.log(`app running at ${PORT}`))