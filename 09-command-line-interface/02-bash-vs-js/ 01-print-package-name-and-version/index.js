const { existsSync, mkdirSync, rmSync } = require('node:fs')
const { execSync } = require('node:child_process')

const FOLDER_AMOUNT = 4

function getFolderName (index) {
  return index >= 3 ? `js-0${index}` : `mjs-0${index}`
}

function rmFolder (folderName) {
  rmSync(`./${folderName}`, { recursive: true })
}

function makeFolderAndReturnName (folderName) {
  if (existsSync(folderName)) {
    rmFolder(folderName)
  }
  mkdirSync(folderName)
  return folderName
}

function initPackage (folderName) {
  execSync('npm init -y --scope @kastorcode --silent', {
    cwd: `./${folderName}`
  })
  return folderName
}

function printPackageNameAndVersion (folderName) {
  const { name, version } = require(`./${folderName}/package.json`)
  console.log({ n: name, v: version })
  return folderName
}

Array.from(Array(FOLDER_AMOUNT).keys())
  .map(index => makeFolderAndReturnName(getFolderName(++index)))
  .map(folderName => initPackage(folderName))
  .map(folderName => printPackageNameAndVersion(folderName))
  .map(folderName => rmFolder(folderName))