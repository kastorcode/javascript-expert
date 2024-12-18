import { ViewFactory } from '../../shared/base/viewFactory.mjs'
import { ConsoleTableComponent } from './table.mjs'

export default class ConsoleFactory extends ViewFactory {

  createTable () {
    return new ConsoleTableComponent()
  }

}