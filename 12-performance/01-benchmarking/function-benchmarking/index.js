import Benchmark from 'benchmark'
import database from '../database.js'
import CartIdNew from './cart-id-new.js'
import CartIdOld from './cart-id-old.js'
import CartPriceNew from './cart-price-new.js'
import CartPriceOld from './cart-price-old.js'
import CartRmPropNew from './cart-rm-prop-new.js'
import CartRmPropOld from './cart-rm-prop-old.js'

const suite = new Benchmark.Suite()

// suite
//   .add('Cart id uuid v4', function () {
//     new CartIdOld()
//   })
//   .add('Cart id crypto randomUUID', function () {
//     new CartIdNew()
//   })
//   .on('cycle', event => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run()

const data = {
  products: [
    {
      id: '1',
      a: undefined,
      b: undefined,
      c: null,
      d: 123
    },
    {
      id: '2',
      a: undefined,
      b: undefined,
      c: null,
      d: 456
    }
  ]
}

// suite
//   .add('Cart remove undefined props with filter and map', function () {
//     new CartRmPropOld(data)
//   })
//   .add('Cart remove undefined props with for of loop', function () {
//     new CartRmPropNew(data)
//   })
//   .on('cycle', event => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run({ async: true })

suite
  .add('Cart getCartPrice with map and reduce', function () {
    new CartPriceOld(database)
  })
  .add('Cart getCartPrice with for of loop', function () {
    new CartPriceNew(database)
  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })