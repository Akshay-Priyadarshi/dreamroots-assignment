import { BadRequestError } from "../models/error.model"
import { ApiResponse } from "../models/response.model"
import { readJsonFile, writeJsonFile } from "../utils/index.util"

export const appendInJsonFile = async (
    filePath: string,
    generatedNumber: number
) => {
    const previousContent = (await readJsonFile(filePath)) as number[]
    previousContent.push(generatedNumber)
    await writeJsonFile(filePath, previousContent)
}

export const addNumber = async (inputNumber: string): Promise<ApiResponse> => {
    const obtainedNumber = Number.parseInt(inputNumber)
    if (Number.isNaN(obtainedNumber)) {
        throw new BadRequestError(
            `Obtained number '${inputNumber}' is not a number`
        )
    }
    const generatedNumber = obtainedNumber * 7
    const STATIC_FILE_BASE_PATH = "./statics"
    const JSON_FILE_MAP: { [key: string]: string } = {
        A: "A.json",
        B: "B.json",
        C: "C.json",
        D: "D.json",
    }
    let filePath
    if (generatedNumber > 140) {
        // send to file a
        filePath = `${STATIC_FILE_BASE_PATH}/${JSON_FILE_MAP.A}`
    } else if (generatedNumber > 100) {
        // send to file b
        filePath = `${STATIC_FILE_BASE_PATH}/${JSON_FILE_MAP.B}`
    } else if (generatedNumber > 60) {
        // send to file c
        filePath = `${STATIC_FILE_BASE_PATH}/${JSON_FILE_MAP.C}`
    } else {
        // send to file d
        filePath = `${STATIC_FILE_BASE_PATH}/${JSON_FILE_MAP.D}`
    }
    appendInJsonFile(filePath, generatedNumber)
    const apiResponse = new ApiResponse("Added generated number to proper file")
    return apiResponse
}

export const listNumbers = async (): Promise<ApiResponse> => {
    const numbersData: { [key: string]: string } = {}
    const STATIC_FILE_BASE_PATH = "./statics"
    const JSON_FILE_MAP: { [key: string]: string } = {
        A: "A.json",
        B: "B.json",
        C: "C.json",
        D: "D.json",
    }
    for (const [fileKey, fileName] of Object.entries(JSON_FILE_MAP)) {
        const filePath = `${STATIC_FILE_BASE_PATH}/${JSON_FILE_MAP[fileKey]}`
        const fileContent = await readJsonFile(filePath)
        numbersData[fileKey] = fileContent
    }
    const apiResponse = new ApiResponse(
        "Numbers fetched successfully",
        200,
        numbersData
    )
    return apiResponse
}
