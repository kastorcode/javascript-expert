import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Person } from '../src/person.js'

describe('Person', () => {

  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('1 Bike,Tricycle 1000 2022-01-01 2024-01-01')
    const expected = {
      id: '1',
      vehicles: ['Bike', 'Tricycle'],
      kmTraveled: '1000',
      from: '2022-01-01',
      to: '2024-01-01'
    }
    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '1',
      vehicles: ['Bike', 'Tricycle'],
      kmTraveled: '1000',
      from: '2022-01-01',
      to: '2024-01-01'
    })
    const result = person.formatted('pt-BR')
    const expected = {
      id: 1,
      vehicles: 'Bike e Tricycle',
      kmTraveled: '1.000 km',
      from: '01 de janeiro de 2022',
      to: '01 de janeiro de 2024'
    }
    expect(result).to.be.deep.equal(expected)
  })

})