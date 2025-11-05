import { Router } from "express";
import catsControllers from "./cats.controllers.js";

const router = Router()

router.get("/get", catsControllers.getAllCats)
router.post("/post", catsControllers.postCats)
router.delete("/:catId", catsControllers.deletedCatCard)
router.put("/:catId", catsControllers.updatedCatCard)

export default router