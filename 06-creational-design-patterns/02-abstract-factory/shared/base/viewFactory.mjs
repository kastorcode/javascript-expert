import { NotImplementedException } from '../notImplementedException.mjs'

export class ViewFactory {

  createTable () {
    throw new NotImplementedException(this.createTable.name)
  }

}