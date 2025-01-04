export default class VikingService {

  constructor ({ repository: vikingRepository }) {
    this.vikingRepository = vikingRepository
  }

  create (data) {
    return this.vikingRepository.create(data)
  }

  read (query) {
    return this.vikingRepository.read(query)
  }

  update (id, data) {
    return this.vikingRepository.update(id, data)
  }

  delete (id) {
    return this.vikingRepository.delete(id)
  }

}