#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

function hero ({ name, age, power }) {
  return { name, age, power, id: Date.now() }
}

function heroBuilderHandler (builder) {
  return builder
    .option('name', { alias: 'n', demandOption: true, describe: 'hero name', type: 'string' })
    .option('age', { alias: 'a', demandOption: true, describe: 'hero age', type: 'number' })
    .option('power', { alias: 'p', demandOption: true, describe: 'hero power', type: 'string' })
    .example('createHero --name Spiderman --age 20 --power Web', 'create a new hero')
    .example('createHero -n Spiderman -a 20 -p Web', 'create a new hero')
}

const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a new hero', heroBuilderHandler)
  .epilog('Copyright 2024 - <kastor.code/> Matheus Ramalho de Oliveira')

console.log(hero(argv))