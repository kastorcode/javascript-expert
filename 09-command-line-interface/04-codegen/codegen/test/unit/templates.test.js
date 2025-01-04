import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import templates from '../../src/templates/index.js'
import { factoryTemplateMock, repositoryTemplateMock, serviceTemplateMock } from './mocks/index.js'

const { factoryTemplate, repositoryTemplate, serviceTemplate } = templates

describe('#Codegen 3 Layers Architecture', () => {

  const componentName = 'product'
  const factoryName = `${componentName}Factory`
  const repositoryName = `${componentName}Repository`
  const serviceName = `${componentName}Service`

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('should generate repository template', () => {
    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock
    }
    const result = repositoryTemplate(componentName)
    expect(result).toStrictEqual(expected)
  })

  test('should generate service template', () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock
    }
    const result = serviceTemplate(componentName, repositoryName)
    expect(result).toStrictEqual(expected)
  })

  test('should generate factory template', () => {
    const expected = {
      fileName: factoryName,
      template: factoryTemplateMock
    }
    const result = factoryTemplate(componentName, repositoryName, serviceName)
    expect(result).toStrictEqual(expected)
  })

})