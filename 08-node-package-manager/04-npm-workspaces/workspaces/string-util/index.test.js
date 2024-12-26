import { deepStrictEqual } from 'assert'
import StringUtil from './index.js'

{
  const expected = true
  const data = ''
  const result = StringUtil.isEmpty(data)
  deepStrictEqual(result, expected)
}
{
  const expected = false
  const data = 'NOT_EMPTY'
  const result = StringUtil.isEmpty(data)
  deepStrictEqual(result, expected)
}
{
  const expected = 'HelloWorld'
  const data = ' H e l l o W o r l d '
  const result = StringUtil.removeSpaces(data)
  deepStrictEqual(result, expected)
}