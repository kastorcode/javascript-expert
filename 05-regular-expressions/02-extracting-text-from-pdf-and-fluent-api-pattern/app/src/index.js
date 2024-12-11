'use strict'

const { readFile } = require('node:fs/promises')
const { join } = require('node:path')
const pdf = require('pdf-parse')
const { TextProcessorFacade } = require('./textProcessorFacade')

;(async () => {
  const dataBuffer = await readFile(join(__dirname, '../../docs/contrato.pdf'))
  const data = await pdf(dataBuffer)
  const textProcessorFacade = new TextProcessorFacade(data.text)
  const people = textProcessorFacade.getPeopleFromPDF()
  console.log(people)
})()