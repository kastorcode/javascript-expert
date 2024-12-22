import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js'

describe('#RickAndMortyBRLAdapter Test Suite', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
    const getCharactersFromJSONSpy = jest.spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name).mockResolvedValue([])
    const result = await RickAndMortyBRLAdapter.getCharacters()
    expect(result).toEqual([])
    expect(getCharactersFromJSONSpy).toHaveBeenCalled()
  })

})