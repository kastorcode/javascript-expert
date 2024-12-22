import BaseBusiness from './base/baseBusiness.js'

export default class OrderBusiness extends BaseBusiness {

  #oder = new Set()

  _validateRequiredFields (data) {
    return !!data.amount && !!data.products.length
  }

  _create (data) {
    this.#oder.add(data)
    return true
  }

}