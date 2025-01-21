import { spawn } from 'node:child_process'

const pythonFile = './index.py'
const pythonCommand = 'python3'

async function requestPython ({ filePath, headers, url }) {
  const pythonProcess = spawn(pythonCommand, [
    pythonFile,
    JSON.stringify({ filePath, headers, url })
  ])
  const dataString = []
  for await (const data of pythonProcess.stdout) {
    dataString.push(data.toString())
  }
  return dataString.join('')
}

const result = await requestPython({
  url: 'http://localhost:3000',
  headers: { 'content-type': 'application/json' },
  filePath: './my-data.csv'
})

console.log({ result })