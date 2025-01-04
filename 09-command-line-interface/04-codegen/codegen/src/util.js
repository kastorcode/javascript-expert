export default class Util {

  static upperCaseFirstLetter (str) {
    const [first, ...rest] = str
    if (!first) return ''
    return [first.toUpperCase(), ...rest].join('')
  }

  static lowerCaseFirstLetter (str) {
    const [first, ...rest] = str
    if (!first) return ''
    return [first.toLowerCase(), ...rest].join('')
  }

}