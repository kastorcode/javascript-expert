#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createFiles } from './createFiles.js'
import { createLayersIfNotExists } from './createLayers.js'

const { argv } = yargs(hideBin(process.argv))
  .command('skeleton', 'create project skeleton', builder => {
    return builder
      .option('component-name', { alias: 'c', demandOption: true, describe: "component's name", type: 'array' })
      .example('skeleton --component-name product', 'creates a project with single domain')
      .example('skeleton -c product -c person', 'creates a project with a list of domains')
  })
  .epilog('Copyright 2025 - <kastor.code/> Matheus Ramalho de Oliveira')

const { componentName } = argv
const { NODE_ENV } = process.env

const defaultMainFolder = NODE_ENV === 'dev' ? 'tmp' : 'src'
const layers = ['factory', 'repository', 'service']
const mainPath = '.'

const config = {
  defaultMainFolder,
  layers,
  mainPath
}

await createLayersIfNotExists(config)

const pendingPromises = []

for (const domain of componentName) {
  pendingPromises.push(createFiles({
    ...config,
    componentName: domain
  }))
}

await Promise.all(pendingPromises)