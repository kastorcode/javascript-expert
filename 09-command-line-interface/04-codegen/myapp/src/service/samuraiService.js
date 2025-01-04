export default class SamuraiService {

  constructor ({ repository: samuraiRepository }) {
    this.samuraiRepository = samuraiRepository
  }

  create (data) {
    return this.samuraiRepository.create(data)
  }

  read (query) {
    return this.samuraiRepository.read(query)
  }

  update (id, data) {
    return this.samuraiRepository.update(id, data)
  }

  delete (id) {
    return this.samuraiRepository.delete(id)
  }

}