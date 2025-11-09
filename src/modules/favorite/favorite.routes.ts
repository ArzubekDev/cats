import { Router } from "express";
import favoriteControllers from "./favorite.controllers.js";

const router = Router()
router.get("/:userId", favoriteControllers.getFavorite);
router.post("/:userId/:catId", favoriteControllers.toggleFavorite);
router.delete("/:id", favoriteControllers.deleteFavorite);

export default router