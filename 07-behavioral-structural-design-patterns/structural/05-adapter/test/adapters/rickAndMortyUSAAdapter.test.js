import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA.js'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter.js'

describe('#RickAndMortyUSAAdapter Test Suite', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersFromXML', async () => {
    const getCharactersFromXMLSpy = jest.spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name).mockResolvedValue([])
    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(result).toEqual([])
    expect(getCharactersFromXMLSpy).toHaveBeenCalled()
  })

})