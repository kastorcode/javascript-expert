export default class Cart {

  constructor ({ products }) {
    this.products = products
    this.totalPrice = this.getCartPrice()
  }

  getCartPrice () {
    return this.products
      .map(product => product.price)
      .reduce((previous, next) => previous + next, 0)
  }

}