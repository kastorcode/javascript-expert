import { Person } from './person.js'
import { save } from './repository.js'
import { TerminalController } from './terminalController.js'
import database from '../database.json' assert { type: 'json' }

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initTerminal(database, DEFAULT_LANG)

async function mainLoop () {
  try {
    const answer = await terminalController.question()
    if (answer === STOP_TERM) {
      console.log('\n')
      terminalController.closeTerminal()
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)
    return mainLoop()
  }
  catch (error) {
    console.error(error)
    return mainLoop()
  }
}

await mainLoop()