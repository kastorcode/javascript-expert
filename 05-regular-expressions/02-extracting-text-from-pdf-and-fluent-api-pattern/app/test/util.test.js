const { expect } = require('chai')
const { describe, it } = require('mocha')
const { evaluateRegex, InvalidRegexError } = require('../src/util')

describe('Util Suite Test', () => {

  it('evaluateRegex should throw InvalidRegexError using unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })

  it('evaluateRegex should not throw error using safe regex', () => {
    const safeRegex = /^([a-z])$/
    expect(() => evaluateRegex(safeRegex)).to.not.throw()
    expect(evaluateRegex(safeRegex)).to.be.ok
  })

})