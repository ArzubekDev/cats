import { Router } from "express";
import catsControllers from "./cats.controllers";
const router = Router();
router.get("/get", catsControllers.getAllCats);
export default router;
