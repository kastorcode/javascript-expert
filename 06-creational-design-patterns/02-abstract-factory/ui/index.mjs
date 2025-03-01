import { database } from '../shared/data.mjs'

class Application {

  constructor (factory) {
    this.table = factory.createTable()
  }

  init (database) {
    this.table.render(database)
  }

}

;(async function main () {
  const path = globalThis.window ? 'browser' : 'console'
  const { default: ViewFactory } = await import(`../platforms/${path}/index.mjs`)
  const app = new Application(new ViewFactory())
  app.init(database)
})()