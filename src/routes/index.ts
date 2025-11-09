import { Router } from "express";
import cors from "cors";

import authRoutes from "../modules/auth/auth.routes.js";
import catsRoutes from "../modules/cats/cats.routes.js";
import favRoutes from "../modules/favorite/favorite.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const globalRouter: Router = Router();

const corsConfig = {
  origin: ["http://localhost:3000", "https://cats-fxl9.onrender.com"],
};

globalRouter.use("/auth", cors(corsConfig), authRoutes);
globalRouter.use("/cats", cors(corsConfig), catsRoutes);
globalRouter.use("/fav", cors(corsConfig), favRoutes);
globalRouter.use("/user", cors(corsConfig), userRoutes);

export default globalRouter;
