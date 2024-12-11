const { deepStrictEqual, ok } = require('node:assert')

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)

deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map(set.add, set)
arr2.map(set.add, set)

deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])

deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

ok(set.has('3'))

const users1 = new Set(['Naruto', 'Sasuke', 'Sakura'])
const users2 = new Set(['Goku', 'Vegeta', 'Naruto'])
const intersection = new Set([...users1].filter(user => users2.has(user)))
deepStrictEqual(Array.from(intersection), ['Naruto'])

const difference = new Set([...users1].filter(user => !users2.has(user)))
deepStrictEqual(Array.from(difference), ['Sasuke', 'Sakura'])

const user1 = { id: 123 }
let user2 = { id: 456 }
const weakset = new WeakSet([user1])
weakset.add(user2)