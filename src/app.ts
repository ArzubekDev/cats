import "dotenv/config"
import express from "express"
import type { Express } from "express"
import globalRouter from "./routes/index.js"


const buildServer = (): Express => {
    const server = express()
    server.use(express.json())

    server.get("/", (req, res) => {
        res.status(200).json({
            success: true,
        })
    })

    server.use("/api/v1", globalRouter)

    return server
}

export default buildServer