const { evaluateRegex } = require('./util')

class Person {

  constructor ([name, nationality, maritalStatus, document, street, number, neighborhood, city]) {
    const firstLetterRegex = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
    const formatFirstLetter = prop => prop.replace(firstLetterRegex, (match, group1, group2, index) => `${group1.toUpperCase()}${group2.toLowerCase()}`)
    this.name = name
    this.nationality = formatFirstLetter(nationality)
    this.maritalStatus = formatFirstLetter(maritalStatus)
    this.document = document.replace(evaluateRegex(/\D/g), '')
    this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
    this.number = number
    this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s).*$/)).join()
    this.city = city.replace(evaluateRegex(/\.$/), '')
  }

}

module.exports = { Person }