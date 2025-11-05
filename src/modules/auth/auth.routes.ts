import { Router } from "express";
import authControllers from "./auth.controllers.js";

const router: Router = Router()

router.post("/register", authControllers.register)
router.post("/login", authControllers.login)
router.post("/logout", authControllers.logOut)

export default router