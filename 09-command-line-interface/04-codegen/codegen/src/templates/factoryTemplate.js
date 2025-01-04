import Util from '../util.js'

const componentNameAnchor = '$$componentName'
const repositoryDepAnchor = '$$repositoryDep'
const repositoryNameAnchor = '$$repositoryName'
const serviceDepAnchor = '$$serviceDep'
const serviceNameAnchor = '$$serviceName'

const template = `import $$repositoryName from '../repository/$$repositoryDep.js'
import $$serviceName from '../service/$$serviceDep.js'

export default class $$componentNameFactory {

  static getInstance () {
    const repository = new $$repositoryName()
    const service = new $$serviceName({ repository })
    return service
  }

}`

export function factoryTemplate (componentName, repositoryName, serviceName) {
  const textFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(repositoryDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
  return {
    fileName: `${componentName}Factory`,
    template: textFile
  }
}