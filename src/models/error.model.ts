import { ApiResponse } from "./response.model"

export class AppError extends Error {
    statusCode: number
    success: boolean
    constructor(message: string, statusCode: number | undefined = 400) {
        super(message)
        this.statusCode = statusCode
        this.success = statusCode >= 200 && statusCode < 300 ? true : false
    }

    getApiResponse = (): ApiResponse => {
        const apiResponse = new ApiResponse(this.message, this.statusCode)
        return apiResponse
    }
}

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400)
    }
}
