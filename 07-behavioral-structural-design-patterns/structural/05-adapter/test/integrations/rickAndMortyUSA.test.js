import { readFile } from 'fs/promises'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import axios from 'axios'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA.js'
import Character from '../../src/entities/character.js'

describe('#RickAndMortyUSA Test Suite', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharactersFromXML should return a list of Character Entity', async () => {
    const response = await readFile('./test/mocks/characters.xml')
    const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)"}]
    jest.spyOn(axios, 'get').mockResolvedValue({ data:response })
    const result = await RickAndMortyUSA.getCharactersFromXML()
    expect(result).toMatchObject(expected)
  })

  test('#getCharactersFromXML should return an empty list if the API returns nothing', async () => {
    const response = await readFile('./test/mocks/characters-empty.xml')
    jest.spyOn(axios, 'get').mockResolvedValue({ data:response })
    const result = await RickAndMortyUSA.getCharactersFromXML()
    const expected = []
    expect(result).toStrictEqual(expected)
  })

})