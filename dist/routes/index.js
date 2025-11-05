import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import catsRoutes from "../modules/cats/cats.routes.js";
import cors from "cors";
const globalRouter = Router();
const corsConfig = {
    origin: ["http://localhost:3000"]
};
globalRouter.use("/auth", cors(corsConfig), authRoutes);
globalRouter.use("/cats", cors(corsConfig), catsRoutes);
export default globalRouter;
