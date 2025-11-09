import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
  const user = (req as any).user;
  res.json({
    message: "Protected route",
    user,
  });
});

export default router;
