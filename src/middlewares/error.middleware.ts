import { NextFunction, Request, Response } from "express"
import { AppError } from "../models/error.model"

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err)
    if (err instanceof AppError) {
        const apiResponse = err.getApiResponse()
        res.status(apiResponse.statusCode).json(apiResponse.getJson())
    } else {
        const unhandledError = new AppError("Internal Server Error", 500)
        const apiResponse = unhandledError.getApiResponse()
        res.status(apiResponse.statusCode).json(apiResponse.getJson())
    }
}
