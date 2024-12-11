const { deepStrictEqual } = require('node:assert')

function* calculatoin (x, y) {
  yield x * y
}

function* main () {
  for (let i = 0; i < 3; i++) {
    yield* calculatoin(i, i)
  }
}

const generator = main()

deepStrictEqual(generator.next(), { value: 0, done: false })
deepStrictEqual(generator.next(), { value: 1, done: false })
deepStrictEqual(generator.next(), { value: 4, done: false })
deepStrictEqual(generator.next(), { value: undefined, done: true })

deepStrictEqual(Array.from(main()), [0, 1, 4])
deepStrictEqual([...main()], [0, 1, 4])

const { readdir, readFile, stat } = require('node:fs/promises')

function* promisified () {
  yield readFile(__filename)
  yield Promise.resolve('end of promisified')
}

async function* systemInfo () {
  const file = await readFile(__filename)
  yield { file: file.toString() }
  const { size } = await stat(__filename)
  yield { size }
  const dir = await readdir(__dirname)
  yield { dir }
}

(async () => {
  for await (const item of promisified()) {
    console.log(item.toString())
  }
})()

// (async () => {
//   for await (const item of systemInfo()) {
//     console.log(item)
//   }
// })()