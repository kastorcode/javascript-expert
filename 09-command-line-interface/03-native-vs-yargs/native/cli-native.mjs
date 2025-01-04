const [nodePath, filePath, ...args] = process.argv

function parseArgs (args) {
  const cmd = new Map()
  const commandPrefix = '--'
  for (const i in args) {
    const index = parseInt(i)
    const value = args[index]
    if (!value.includes(commandPrefix)) {
      continue
    }
    cmd.set(value.replace(commandPrefix, ''), args[index + 1])
  }
  return Object.fromEntries(cmd)
}

console.log(parseArgs(args))