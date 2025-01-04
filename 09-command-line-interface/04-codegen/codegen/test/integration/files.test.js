import fsPromises from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { createFiles } from '../../src/createFiles.js'
import { createLayersIfNotExists } from '../../src/createLayers.js'
import Util from '../../src/util.js'

function generateFilePath ({ componentName, defaultMainFolder, layers, mainPath }) {
  return layers.map(layer => {
    const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
    return join(mainPath, defaultMainFolder, layer, fileName)
  })
}

function getAllMethods (obj) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(obj))
    .filter(method => method !== 'constructor')
}

describe('#Integration - Files Structure', () => {

  const config = {
    componentName: 'heroes',
    defaultMainFolder: 'src',
    layers: ['factory', 'repository', 'service'],
    mainPath: ''
  }

  const packageJSON = 'package.json'
  const packageJsonPath = join('./test/integration/mocks', packageJSON)

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
    await fsPromises.copyFile(packageJsonPath, join(config.mainPath, packageJSON))
    await createLayersIfNotExists(config)
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('Repository class should have create, read, update and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository']
    }
    await createFiles(myConfig)
    const [repositoryFile] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const repository = new Repository()
    const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual('Method not implemented')
    expectNotImplemented(repository.create)
    expectNotImplemented(repository.read)
    expectNotImplemented(repository.update)
    expectNotImplemented(repository.delete)
  })

  test('Service class should have the same signature of Repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service']
    }
    await createFiles(myConfig)
    const [repositoryFile, serviceFile] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)
    const repository = new Repository()
    const service = new Service({ repository })
    const allRepositoryMethods = getAllMethods(repository)
    allRepositoryMethods.forEach(method => jest.spyOn(repository, method).mockResolvedValue())
    const allServiceMethods = getAllMethods(service)
    allServiceMethods.forEach(method => service[method].call(service, []))
    allRepositoryMethods.forEach(method => expect(repository[method]).toHaveBeenCalledTimes(1))
  })

  test('Factory instance should match layers', async () => {
    await createFiles(config)
    const [factoryFile, repositoryFile, serviceFile] = generateFilePath(config)
    const { default: Factory } = await import(factoryFile)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)
    const expected = new Service({ repository: new Repository() })
    const result = Factory.getInstance()
    expect(result).toBeInstanceOf(Service)
    expect(result).toMatchObject(expected)
  })

})