const { expect } = require('chai')
const { describe, it } = require('mocha')
const { productValidator } = require('../src')
const { ProductMotherObject } = require('./model/productMotherObject')

describe('Mother Object Test Suite', () => {

  it("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.valid()
    const result = productValidator(product)
    const expected = {
      result: true,
      errors: []
    }
    expect(result).to.be.deep.equal(expected)
  })

  describe('Product Validation Rules Test Suite', () => {

    it('should return an object error when creting a Product with invalid id', () => {
      const product = ProductMotherObject.withInvalidId()
      const result = productValidator(product)
      const expected = {
        result: false,
        errors: ['id: invalid length, current 1, expected to be between 2 and 20']
      }
      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creting a Product with invalid name', () => {
      const product = ProductMotherObject.withInvalidName()
      const result = productValidator(product)
      const expected = {
        result: false,
        errors: ['name: invalid value, current abc123, expected to have only words']
      }
      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creting a Product with invalid price', () => {
      const product = ProductMotherObject.withInvalidPrice()
      const result = productValidator(product)
      const expected = {
        result: false,
        errors: ['price: invalid value, current 2000, expected to be between 0 and 1000']
      }
      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creting a Product with invalid category', () => {
      const product = ProductMotherObject.withInvalidCategory()
      const result = productValidator(product)
      const expected = {
        result: false,
        errors: ['category: invalid value, current mecanic, expected to be electronic or organic']
      }
      expect(result).to.be.deep.equal(expected)
    })

  })

})