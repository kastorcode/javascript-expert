import fs from 'fs'
import fsPromises from 'fs/promises'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { createLayersIfNotExists } from '../../src/createLayers.js'

describe('#Layers - Folder Structure', () => {

  const defaultLayers = ['factory', 'repository', 'service']

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('should create folders if not exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false)
    await createLayersIfNotExists({ layers: defaultLayers, mainPath: '' })
    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  })

  test('should not create folders if exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true)
    await createLayersIfNotExists({ layers: defaultLayers, mainPath: '' })
    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).not.toHaveBeenCalled()
  })

})