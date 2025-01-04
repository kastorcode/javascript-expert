import SamuraiRepository from '../repository/samuraiRepository.js'
import SamuraiService from '../service/samuraiService.js'

export default class SamuraiFactory {

  static getInstance () {
    const repository = new SamuraiRepository()
    const service = new SamuraiService({ repository })
    return service
  }

}