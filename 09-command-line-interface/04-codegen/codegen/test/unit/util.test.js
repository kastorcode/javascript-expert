import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import Util from '../../src/util.js'

describe('#Util - Strings', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('#upperCaseFirstLetter should transform the first letter in upperCase', () => {
    const data = 'hello'
    const expected = 'Hello'
    const result = Util.upperCaseFirstLetter(data)
    expect(result).toStrictEqual(expected)
  })

  test('#lowerCaseFirstLetter should transform the first letter in lowerCase', () => {
    const data = 'Hello'
    const expected = 'hello'
    const result = Util.lowerCaseFirstLetter(data)
    expect(result).toStrictEqual(expected)
  })

  test('#upperCaseFirstLetter given an empty string should return empty', () => {
    const data = ''
    const result = Util.upperCaseFirstLetter(data)
    expect(result).toStrictEqual(data)
  })

  test('#lowerCaseFirstLetter given an empty string should return empty', () => {
    const data = ''
    const result = Util.lowerCaseFirstLetter(data)
    expect(result).toStrictEqual(data)
  })

})