const { Person } = require('./person')
const { evaluateRegex } = require('./util')

class TextProcessorFluentAPI {

  #content

  constructor (content) {
    this.#content = content
  }

  build () {
    return this.#content
  }

  extractPeopleData () {
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }

  divideTextInColumns () {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters () {
    const removeLineBreakRegex = evaluateRegex(/\n/g)
    const removeEmptyRegex = evaluateRegex(/^\s+|\s+$/gmi)
    this.#content = this.#content.map(line => line.map(item =>
      item.replace(removeLineBreakRegex, '').replace(removeEmptyRegex, ''))
    )
    return this
  }

  mapPerson () {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

}

module.exports = { TextProcessorFluentAPI }