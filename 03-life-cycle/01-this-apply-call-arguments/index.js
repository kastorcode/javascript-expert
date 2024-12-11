'use strict'

const { promises: { readFile }, watch } = require('node:fs')

class File {

  watch (event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent (filename) {
    console.log((await readFile(filename)).toString())
  }

}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString())
// })

const file = new File()
/**
 * Dessa forma ele ignora o 'this' da classe File e
 * herda o 'this' do método watch
 */
watch(__filename, file.watch)

/**
 * ALTERNATIVAS
 */

console.log('\n---\n')

// Alternativa para não herdar o this da função, porém fica feio
// watch(__filename, (event, filename) => file.watch(event, filename))

console.log('\n---\n')

/**
 * Alternativa mais profissional:
 * Podemos deixar explícito qual é o contexto que a função deve seguir,
 * o bind retorna uma função com o 'this' que se mantém de File, ignorando o watch
 */
// watch(__filename, file.watch.bind(file))

/**
 * A diferença entre um e outro é que em um você passa os argumentos como array e no outro
 * uma lista de argumentos
 */
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)

console.log('\n---\n')

file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])