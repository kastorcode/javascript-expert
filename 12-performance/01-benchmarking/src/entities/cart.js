// import { v4 as uuid } from 'uuid'
import { randomUUID as uuid } from 'node:crypto'
import Product from './product.js'

export default class Cart {

  constructor ({ at, products }) {
    this.id = uuid()
    this.at = at
    this.products = this.removeUndefinedProps(products)
    this.totalPrice = this.getCartPrice()
  }

  removeUndefinedProps (products) {
    const productsEntities = products
      .filter(product => !!Reflect.ownKeys(product).length)
      .map(product => new Product(product))
    return JSON.parse(JSON.stringify(productsEntities))
  }

  getCartPrice () {
    return this.products
      .map(product => product.price)
      .reduce((previous, next) => previous + next, 0)
  }

}