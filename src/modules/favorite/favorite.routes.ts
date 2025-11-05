import { Router } from "express";
import favoriteControllers from "./favorite.controllers.js";

const router = Router()
router.get("/:userId/:catId", favoriteControllers.getFavorite);
router.post("/:userId/:catId", favoriteControllers.postFavorite);
router.delete("/:userId/:catId", favoriteControllers.deleteFavorite);

export default router