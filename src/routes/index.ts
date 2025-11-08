import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js"
import catsRoutes from "../modules/cats/cats.routes.js"
import favRoutes from "../modules/favorite/favorite.routes.js"
import cors from "cors"

const globalRouter: Router = Router()

const corsConfig = {
    origin: ["http://localhost:3000", "https://cats-fxl9.onrender.com"]
}

globalRouter.use("/auth", cors(corsConfig), authRoutes)
globalRouter.use("/cats", cors(corsConfig), catsRoutes)
globalRouter.use("/fav", cors(corsConfig), favRoutes)

export default globalRouter