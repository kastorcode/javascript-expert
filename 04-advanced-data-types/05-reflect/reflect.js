'use strict'

const { deepStrictEqual, ok, throws } = require('node:assert')

const myObj = {
  add (myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

deepStrictEqual(myObj.add.apply({ arg1: 1, arg2: 2 }, [3]), 6)

myObj.add.apply = () => { throw new TypeError('unknown') }
throws(() => myObj.add.apply({}, []), { name: 'TypeError', message: 'unknown' })

const result = Reflect.apply(myObj.add, { arg1: 1, arg2: 2 }, [3])
deepStrictEqual(result, 6)

function MyDate () {}
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })
deepStrictEqual(MyDate.withObject(), 'Hey there')
deepStrictEqual(MyDate.withReflection(), 'Hey dude')

const withDelete = { user: 'Matheus' }
deepStrictEqual(withDelete.hasOwnProperty('user'), true)
delete withDelete.user
deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'KastorCode' }
deepStrictEqual(Reflect.has(withReflection, 'user'), true)
Reflect.deleteProperty(withReflection, 'user')
deepStrictEqual(Reflect.has(withReflection, 'user'), false)

deepStrictEqual(1['user'], undefined)
throws(() => Reflect.get(1, 'user'), TypeError)

ok('superman' in { superman: '' })
ok(Reflect.has({ batman: '' }, 'batman'))

const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'Matheus'
}
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]
deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])
deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])