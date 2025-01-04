import fsPromises from 'fs/promises'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { createFiles } from '../../src/createFiles.js'
import templates from '../../src/templates/index.js'

describe('#Layers - Files Structure', () => {

  const config = {
    componentName: 'heroes',
    defaultMainFolder: 'src',
    layers: ['factory', 'repository', 'service'],
    mainPath: './'
  }

  const repositoryLayer = `${config.componentName}Repository`
  const serviceLayer = `${config.componentName}Service`

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('should not create file stucture on inexistent template', async () => {
    const myConfig = {
      ...config,
      layers: ['inexistent']
    }
    const expected = {
      error: 'the chosen layer does not have a template'
    }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
  })

  test('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      fileName: '',
      template: ''
    })
    const myConfig = {
      ...config,
      layers: ['repository']
    }
    const expected = {
      success: true
    }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
  })

  test('service should have repository as dependency', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      fileName: '',
      template: ''
    })
    const myConfig = {
      ...config,
      layers: ['repository', 'service']
    }
    const expected = {
      success: true
    }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
  })

  test('factory should have repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({
      fileName: '',
      template: ''
    })
    const expected = {
      success: true
    }
    const result = await createFiles(config)
    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(config.layers.length)
    expect(templates.factoryTemplate).toHaveBeenCalledWith(config.componentName, repositoryLayer, serviceLayer)
  })

})