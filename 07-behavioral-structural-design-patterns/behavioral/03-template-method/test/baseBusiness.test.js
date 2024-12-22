import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions.js'

describe('#BaseBusiness Test Suite', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should throw an error when child class does not implement _validateRequiredFields method', () => {
    class ConcreteClass extends BaseBusiness {}
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name)
    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCEED = false
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new Error('Invalid data')
    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should throw an error when child class does not implement _create method', () => {
    const VALIDATION_SUCCEED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(concreteClass._create.name)
    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should call _create and _validateRequiredFields on create method', () => {
    const VALIDATION_SUCCEED = true
    const CREATION_SUCCEED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEED)
      _create = jest.fn().mockReturnValue(CREATION_SUCCEED)
    }
    const concreteClass = new ConcreteClass()
    const baseBusinessCreateSpy = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name)
    const result = concreteClass.create({})
    expect(result).toBeTruthy()
    expect(baseBusinessCreateSpy).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    expect(concreteClass._create).toHaveBeenCalled()
  })

})