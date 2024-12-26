import StringUtil from '@kastorcode/string-util'

const availableFormats = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'yyyy/mm/dd': '$<year>/$<month>/$<day>'
}

const ddmmyyyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g
const yyyymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g

const strToDateExps = {
  'dd-mm-yyyy': ddmmyyyy,
  'dd/mm/yyyy': ddmmyyyy,
  'yyyy-mm-dd': yyyymmdd,
  'yyyy/mm/dd': yyyymmdd
}

export default class DateUtil {

  static formatDate (date, format) {
    const expression = availableFormats[format]
    if (!expression) {
      return { error: `the format ${format} is not available yet` }
    }
    const [result] = date.toISOString().match(yyyymmdd)
    return result.replace(yyyymmdd, expression)
  }

  static formatString (dateStr, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: 'your date is empty' }
    }
    if (!availableFormats[currentFormat]) {
      return { error: `the format ${currentFormat} is not available yet` }
    }
    if (!availableFormats[expectedFormat]) {
      return { error: `the format ${expectedFormat} is not available yet` }
    }
    const toDateExp = strToDateExps[currentFormat]
    const dateStrInISO = StringUtil
      .removeSpaces(dateStr)
      .replace(toDateExp, '$<year>-$<month>-$<day>')
    const finalDate = new Date(dateStrInISO)
    return this.formatDate(finalDate, expectedFormat)
  }

}