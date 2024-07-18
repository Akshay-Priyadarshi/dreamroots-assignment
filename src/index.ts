import express from "express"
import { rootController } from "./controllers/root.controller"
import { errorMiddleware } from "./middlewares/error.middleware"

const app = express()
const PORT = process.env.NODE_PORT || 8080

app.use(express.json())

app.use(rootController)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`)
})
