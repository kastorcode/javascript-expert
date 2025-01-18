import { randomUUID } from 'node:crypto'

export default class Cart {
  constructor () {
    this.id = randomUUID()
  }
}