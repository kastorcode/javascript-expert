import BaseError from './base/baseError.js'

export default class BusinessError extends BaseError {

  constructor (message) {
    super({
      message,
      name: 'BusinessError'
    })
  }

}