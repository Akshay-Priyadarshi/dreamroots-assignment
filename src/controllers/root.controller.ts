import { Router } from "express"
import { addNumber, listNumbers } from "../services/root.service"

export const rootController = Router()

rootController.get("/HealthCheck", (req, res, next) => {
    res.json({ status: "UP" })
})

rootController.get("/AddNumber/:number", async (req, res, next) => {
    try {
        const apiResponse = await addNumber(req.params.number)
        res.status(apiResponse.statusCode).json(apiResponse.getJson())
    } catch (err) {
        next(err)
    }
})

rootController.get("/ListNumbers", async (req, res, next) => {
    try {
        const apiResponse = await listNumbers()
        res.status(apiResponse.statusCode).json(apiResponse.getJson())
    } catch (err) {
        next(err)
    }
})
