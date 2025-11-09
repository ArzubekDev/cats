import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/token.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Token не предоставлен!",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token); 

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      message: "Недействительный или истекший токен!",
    });
  }
};

export default authMiddleware;
