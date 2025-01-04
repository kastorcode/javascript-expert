import NinjaRepository from '../repository/ninjaRepository.js'
import NinjaService from '../service/ninjaService.js'

export default class NinjaFactory {

  static getInstance () {
    const repository = new NinjaRepository()
    const service = new NinjaService({ repository })
    return service
  }

}