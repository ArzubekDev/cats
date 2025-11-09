import { Request, Response } from "express";
import prisma from "../../config/prisma.js";

// 🔹 Get Favorite (check if user added this cat)
const getFavorite = async (req: Request, res: Response) => {
  try {
    const { catId, userId } = req.params;

    const fav = await prisma.favorite.findUnique({
      where: {
        userId_catId: {  
          userId: Number(userId),
          catId: Number(catId),
        },
      },
      include: {
        cat: true,
      },
    });

    res.status(200).json({
      success: true,
      favorite: fav,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getFavorite: ${error}`,
    });
  }
};

// 🔹 Post Favorite (add to favorites)
const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const { catId } = req.params;
    const userId = req.userId; // authMiddleware кошкон userId

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_catId: { userId: Number(userId), catId: Number(catId) },
      },
    });

    if (existing) {
      // ✅ Эгер бар болсо өчүр
      await prisma.favorite.delete({
        where: {
          userId_catId: { userId: Number(userId), catId: Number(catId) },
        },
      });
      return res.status(200).json({ success: true, favorite: false });
    } else {
      // ✅ Эгер жок болсо кош
      const newFav = await prisma.favorite.create({
        data: { userId: Number(userId), catId: Number(catId) },
      });
      return res.status(201).json({ success: true, favorite: true, favoriteData: newFav });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in toggleFavorite: ${error}` });
  }
};


// 🔹 Delete Favorite (remove from favorites)
const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.favorite.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Бул мышык жаккандарда жок.",
      });
    }

    await prisma.favorite.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Мышык жаккандардан өчүрүлдү.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in deleteFavorite: ${error}`,
    });
  }
};


export default {
  getFavorite,
  toggleFavorite,
  deleteFavorite,
};
