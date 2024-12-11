const { deepStrictEqual, ok, throws } = require('node:assert')

const myMap = new Map()

/**
 * Podem ter qualquer coisa como chave
 */
myMap
  .set(1, 'ONE')
  .set('two', { text: 'TWO' })
  .set(true, () => 'TRUE')

/**
 * Usando um construtor
 */
const myMapWithConstructor = new Map([
  ['1', 'ONE_STRING'],
  [1, 'ONE_NUMBER'],
  [true, 'TRUE']
])

console.log('myMap', myMap, '\n')
console.log('myMap.get(1)', myMap.get(1), '\n')
deepStrictEqual(myMap.get('two'), { text: 'TWO' })
deepStrictEqual(myMap.get(true)(), 'TRUE')

/**
 * Em objects a chave só pode ser string ou symbol
 * (number é coergido a string)
 */
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Matheus' })
console.log('getWithoutReference', myMap.get({ id: 1 }), '\n') // undefined, pois só funciona por referência
console.log('getWithReference', myMap.get(onlyReferenceWorks), '\n')
deepStrictEqual(myMap.get({ id: 1 }), undefined)
deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Matheus' })

/**
 * No Object seria Object.keys({a:1}).length
 * No Map é apenas myMap.size
 */
deepStrictEqual(myMap.size, 4)

/**
 * Para verificar se um item existe no objeto
 * - No Object:
 *   item.key = se não existe retorna undefined
 *   if() = faz a coerção implícita para boolean e retorna false
 * - O jeito correto no Object seria:
 *   ({ name: 'Matheus' }).hasOwnProperty('name')
 * - No map é apenas myMap.has('name')
 */
ok(myMap.has(onlyReferenceWorks))

/**
 * Para remover um item do objeto
 * - No Object é comum ser usado delete item.id porém é imperformático
 * - No map é utilizado o método myMap.delete('name') e retorna um booleano se foi removido ou não
 */
ok(myMap.delete(onlyReferenceWorks))

/**
 * Não dá para iterar em Objects diretamente, mas:
 * - Dá para iterar com o for in, mas vai pegar o index que vai pegar a chave que vai retornar o valor
 * - Para realmente pegar a chave e o valor, utilizamos o Object.entries(item)
 * - No map ele implementa o padrão do generators, ou seja, podemos usar o spread operator
 */
deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'ONE'], ['two', { text: 'TWO' }], [true, null]]))

for (const [key, value] of myMap) {
  console.log({ key, value }, '\n')
}

/**
 * Object é inseguro, pois dependendo do nome da chave, pode substituir
 * algum comportamento padrão
 * ({}).toString() === '[object Object]'
 * ({ toString: () => 'Hey' }).toString() === 'Hey'
 * Qualquer chave pode colidir com as propriedades herdadas do object, como
 * constructor, toString, valueOf, etc
 */
const actor = {
  name: 'Naruto Uzumaki',
  toString: 'Ninja: Uzumaki Naruto'
}

/**
 * Não tem restrição de nome de chave
 */
myMap.set(actor)
deepStrictEqual(myMap.has(actor), true)
throws(() => myMap.get(actor).toString, TypeError)

/**
 * Não da pra limpar um Object sem reassiná-lo,
 * mas no Map conseguimos
 */
myMap.clear()
deepStrictEqual([...myMap.keys()], [])

console.log('\n### WeakMap', '\n')

/**
 * Pode ser coletado após perder as referências
 * Usado em casos bem específicos
 * Tem a maioria dos benefícios do Map, mas não é iterável
 * Só chaves de referência e que você já conheça
 * Mais leve, prevê o memory leak, porque depois que as instâncias saem da memória, tudo é limpo
 */
const weakMap = new WeakMap()
const hero = { name: 'Spiderman' }
weakMap.set(hero)
weakMap.get(hero)
console.log('weakMap.has(hero)', weakMap.has(hero), '\n')
// weakMap.delete(hero)