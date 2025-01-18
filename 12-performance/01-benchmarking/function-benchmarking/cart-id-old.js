import { v4 } from 'uuid'

export default class Cart {
  constructor () {
    this.id = v4()
  }
}