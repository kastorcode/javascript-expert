import fsPromises from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { createLayersIfNotExists } from '../../src/createLayers.js'

describe('#Integration - Layers - Folders Structure', () => {

  const config = {
    defaultMainFolder: 'src',
    layers: ['factory', 'repository', 'service'],
    mainPath: ''
  }

  async function getFolders () {
    return fsPromises.readdir(join(config.mainPath, config.defaultMainFolder))
  }

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('should not create folders if exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)
    await createLayersIfNotExists(config)
    const afterRun = await getFolders()
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })

  test('should create folders if not exists', async () => {
    const beforeRun = await getFolders()
    await createLayersIfNotExists(config)
    const afterRun = await getFolders()
    expect(afterRun).toEqual(beforeRun)
  })

})