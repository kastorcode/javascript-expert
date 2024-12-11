import { readFile, writeFile } from 'node:fs/promises'

export async function save (data) {
  const { pathname } = new URL('../database.json', import.meta.url)
  const parsed = JSON.parse(await readFile(pathname, 'utf-8'))
  parsed.push(data)
  await writeFile(pathname, JSON.stringify(parsed))
}