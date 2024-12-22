import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe('Template Method Design Pattern Test Suite', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('#OrderBusiness Test Suite', () => {

    test('OrderBusiness execution without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }]
      })
      const orderBusiness = new OrderBusiness()
      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()
      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    test('OrderBusiness execution with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }]
      })
      const orderBusiness = new OrderBusiness()
      const validateRequiredFieldsSpy = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
      const createSpy = jest.spyOn(orderBusiness, orderBusiness._create.name)
      const result = orderBusiness.create(order)
      expect(result).toBeTruthy()
      expect(validateRequiredFieldsSpy).toHaveBeenCalled()
      expect(createSpy).toHaveBeenCalled()
    })

  })

})