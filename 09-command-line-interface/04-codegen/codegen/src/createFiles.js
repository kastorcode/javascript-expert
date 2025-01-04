import fs from 'fs'
import fsPromises from 'fs/promises'
import templates from './templates/index.js'
import Util from './util.js'

function defaultDependencies (componentName, layer) {
  const dependencies = {
    factory: [`${componentName}Repository`, `${componentName}Service`],
    repository: [],
    service: [`${componentName}Repository`]
  }
  return dependencies[layer].map(Util.lowerCaseFirstLetter)
}

async function writeFiles (filesToWrite) {
  return Promise.all(
    filesToWrite.map(({ filePath, textFile }) =>
      fsPromises.writeFile(filePath, textFile)
    )
  )
}

export async function createFiles ({ componentName, defaultMainFolder, layers, mainPath }) {
  const keys = Object.keys(templates)
  const filesToWrite = []
  for (const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer))
    if (!chosenTemplate) {
      return {
        error: 'the chosen layer does not have a template'
      }
    }
    const template = templates[chosenTemplate]
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
    const dependencies = defaultDependencies(componentName, layer)
    const { fileName, template: textFile } = template(componentName, ...dependencies)
    const filePath = `${targetFolder}/${fileName}.js`
    filesToWrite.push({ filePath, textFile })
  }
  await writeFiles(filesToWrite)
  return {
    success: true
  }
}