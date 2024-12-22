import RickAndMortyBRLAdapter from './business/adapters/rickAndMortyBRLAdapter.js'
import RickAndMortyUSAAdapter from './business/adapters/rickAndMortyUSAAdapter.js'

const data = [
  RickAndMortyBRLAdapter,
  RickAndMortyUSAAdapter
].map(adapter => adapter.getCharacters())

const allSettled = await Promise.allSettled(data)

const successes = allSettled
  .filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), [])

const failures = allSettled
  .filter(({ status }) => status === 'rejected')

console.info(`SUCCESSES (${successes.length})`)
console.table(successes)
console.error(`\nFAILURES (${failures.length})`)
console.table(failures)