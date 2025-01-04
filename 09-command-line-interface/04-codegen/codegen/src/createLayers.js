import fs from 'fs'
import fsPromises from 'fs/promises'

export async function createLayersIfNotExists ({ defaultMainFolder, layers, mainPath }) {
  const foldersToCreate = layers.filter(layer => !fs.existsSync(layer))
  const defaultPath = `${mainPath}/${defaultMainFolder}`
  const results = foldersToCreate.map(folder =>
    fsPromises.mkdir(`${defaultPath}/${folder}`, { recursive: true })
  )
  return Promise.all(results)
}