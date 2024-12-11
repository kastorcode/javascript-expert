const { deepStrictEqual } = require('node:assert')

let counter1 = 0
deepStrictEqual(counter1, 0)

let counter2 = counter1
counter2++
deepStrictEqual(counter2, 1)

const item1 = { counter: 0 }
item1.counter++
deepStrictEqual(item1, { counter: 1 })

const item2 = item1
item2.counter++
deepStrictEqual(item2, { counter: 2 })