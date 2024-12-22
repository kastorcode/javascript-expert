import { NotImplementedException } from '../../util/exceptions.js'

export default class BaseBusiness {

  _validateRequiredFields (data) {
    throw new NotImplementedException(this._validateRequiredFields.name)
  }

  _create (data) {
    throw new NotImplementedException(this._create.name)
  }

  /*
    Padrão do Martin Fowler
    Garante um fluxo de execução consistente
    Esse create é a implementação do Template Method
  */
  create (data) {
    const isValid = this._validateRequiredFields(data)
    if (!isValid) throw new Error('Invalid data')
    return this._create(data)
  }

}