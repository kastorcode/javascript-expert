import { createInterface } from 'node:readline'
import Chalk from 'chalk'
import ChalkTable from 'chalk-table'
import DraftLog from 'draftlog'
import { Person } from './person.js'

export class TerminalController {

  constructor () {
    this.data = null
    this.print = null
    this.terminal = null
  }

  initTerminal (database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.initTable(database, language)
  }

  initTable (database, language) {
    this.data = database.map(item => new Person(item).formatted(language))
    const table = ChalkTable(this.getTableOptions(), this.data)
    this.print = console.draft(table)
  }

  updateTable (item) {
    this.data.push(item)
    this.print(ChalkTable(this.getTableOptions(), this.data))
  }

  getTableOptions () {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: Chalk.cyan('ID') },
        { field: 'vehicles', name: Chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: Chalk.cyan('KM Traveled') },
        { field: 'from', name: Chalk.cyan('From') },
        { field: 'to', name: Chalk.cyan('To') }
      ]
    }
  }

  closeTerminal () {
    this.terminal.close()
  }

  question (query = '') {
    return new Promise(resolve => {
      this.terminal.question(query, resolve)
    })
  }

}