export default class Cart {

  constructor ({ products }) {
    this.products = products
    this.totalPrice = this.getCartPrice()
  }

  getCartPrice () {
    let totalPrice = 0
    for (const product of this.products) {
      totalPrice += product.price
    }
    return totalPrice
  }

}