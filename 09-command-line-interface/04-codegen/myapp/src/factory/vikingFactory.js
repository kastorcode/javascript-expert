import VikingRepository from '../repository/vikingRepository.js'
import VikingService from '../service/vikingService.js'

export default class VikingFactory {

  static getInstance () {
    const repository = new VikingRepository()
    const service = new VikingService({ repository })
    return service
  }

}