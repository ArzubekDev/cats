import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js"
import cors from "cors"

const globalRouter: Router = Router()

const corsConfig = {
    origin: ["http://localhost:3000"]
}

globalRouter.use("/auth", cors(corsConfig), authRoutes)

export default globalRouter