import DateUtil from '@kastorcode/date-util'

console.log(
  '\n',
  { formatDate: DateUtil.formatDate(new Date('2021-06-01'), 'dd/mm/yyyy') },
  '\n',
  { formatString: DateUtil.formatString('2020-02-10', 'yyyy-mm-dd', 'dd-mm-yyyy') },
  '\n'
)