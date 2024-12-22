import { readFile } from 'fs/promises'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import axios from 'axios'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js'
import Character from '../../src/entities/character.js'

describe('#RickAndMortyBRL Test Suite', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharactersFromJSON should return a list of Character Entity', async () => {
    const response = JSON.parse(await readFile('./test/mocks/characters.json'))
    const expected = response.results.map(char => new Character(char))
    jest.spyOn(axios, 'get').mockResolvedValue({ data:response })
    const result = await RickAndMortyBRL.getCharactersFromJSON()
    expect(result).toStrictEqual(expected)
  })

  test('#getCharactersFromJSON should return an empty list if the API returns nothing', async () => {
    const response = JSON.parse(await readFile('./test/mocks/characters-empty.json'))
    const expected = response.results
    jest.spyOn(axios, 'get').mockResolvedValue({ data:response })
    const result = await RickAndMortyBRL.getCharactersFromJSON()
    expect(result).toStrictEqual(expected)
  })

})