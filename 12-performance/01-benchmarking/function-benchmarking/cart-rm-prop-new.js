import Product from '../src/entities/product.js'

export default class Cart {

  constructor ({ products }) {
    this.products = this.removeUndefinedProps(products)
  }

  removeUndefinedProps (products) {
    const result = []
    for (const product of products) {
      const keys = Reflect.ownKeys(product)
      if (!keys.length) continue
      // 1° way
      // result.push(new Product(JSON.parse(JSON.stringify(product))))
      // 2° way (delete vs Reflect)
      // keys.forEach(key => product[key] || delete product[key])
      // keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
      // result.push(new Product(product))
      // 3° way
      const newProduct = {}
      keys.forEach(key => {
        if (!product[key]) return
        newProduct[key] = product[key]
      })
      result.push(new Product(newProduct))
    }
    return result
  }

}