import { readFile, writeFile } from "fs/promises"

export const readJsonFile = async (filePath: string) => {
    const rawData = await readFile(filePath, "utf-8")
    return JSON.parse(rawData)
}

export const writeJsonFile = async (filePath: string, data: object) => {
    await writeFile(filePath, JSON.stringify(data, null, 2))
}
