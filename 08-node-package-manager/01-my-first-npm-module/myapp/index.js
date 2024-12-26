// import FluentSQLBuilder from '../fluentsql-jest-tdd-yt'
import FluentSQLBuilder from '@kastorcode/fluentsql-jest-tdd-yt'
import database from './database/data.json' assert { type: 'json' }

const result1 = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['name'])
  .limit(3)
  .build()

const result2 = FluentSQLBuilder.for(database)
    .where({ registered: /^(2020|2019)/ })
    .select(['category'])
    .limit(3)
    .countBy('category')
    .build()

console.log('\n', {result1}, '\n')
console.log({result2}, '\n')