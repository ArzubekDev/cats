import { Router } from "express";
import favoriteControllers from "./favorite.controllers";

const router = Router()
router.get("/getFav", favoriteControllers.getFavorite)

export default router