export default class NinjaService {

  constructor ({ repository: ninjaRepository }) {
    this.ninjaRepository = ninjaRepository
  }

  create (data) {
    return this.ninjaRepository.create(data)
  }

  read (query) {
    return this.ninjaRepository.read(query)
  }

  update (id, data) {
    return this.ninjaRepository.update(id, data)
  }

  delete (id) {
    return this.ninjaRepository.delete(id)
  }

}