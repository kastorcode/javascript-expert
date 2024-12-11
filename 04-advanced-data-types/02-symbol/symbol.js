const { deepStrictEqual, throws } = require('node:assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for string key'
user[uniqueKey] = 'value for symbol key'

deepStrictEqual(user.userName, 'value for string key')
deepStrictEqual(user[uniqueKey], 'value for symbol key')
deepStrictEqual(user[Symbol('userName')], undefined)
deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

user[Symbol.for('password')] = 123

deepStrictEqual(user[Symbol.for('password')], 123)

const obj = {
  [Symbol.iterator]: () => ({
    items: ['a', 'b', 'c'],
    index: 0,
    next() {
      if (this.index >= this.items.length) {
        return { done: true }
      }
      return {
        value: this.items[this.index++],
        done: false
      }
    }
  })
}

deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')

class MyDate {

  constructor (...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  async *[Symbol.asyncIterator] () {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
    for (const item of this[kItems]) {
      await timeout(250)
      yield item.toISOString()
    }
  }

  *[Symbol.iterator] () {
    for (const item of this[kItems]) {
      yield item
    }
  }

  [Symbol.toPrimitive] (coercionType) {
    if (coercionType !== 'string') throw new TypeError()
    const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: '2-digit' }).format(item))
    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  get [Symbol.toStringTag] () {
    return 'What?'
  }

}

const myDate = new MyDate([2020, '03', '01'], [2018, '02', '02'])

const expectedDates = [new Date(2020, '03', '01'), new Date(2018, '02', '02')]

throws(() => myDate + 1, TypeError)
deepStrictEqual(Object.prototype.toString.call(myDate), '[object What?]')
deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')
deepStrictEqual([...myDate], expectedDates)

;(async () => {
  for await (const item of myDate) {
    console.log(item)
  }
})()

;(async () => {
  const dates = await Promise.all([...myDate])
  deepStrictEqual(dates, expectedDates)
})()