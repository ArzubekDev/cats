import { Request, Response } from "express";
import prisma from "../../config/prisma";

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
        cat: true, // кааласаң, мышыктын маалыматтарын кошо аласың
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
const postFavorite = async (req: Request, res: Response) => {
  try {
    const { catId, userId } = req.params;

    // Эгер буга чейин кошулган болсо — кайтат
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_catId: {
          userId: Number(userId),
          catId: Number(catId),
        },
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Бул мышык мурда эле 'favorite' катары кошулган.",
      });
    }

    const newFav = await prisma.favorite.create({
      data: {
        userId: Number(userId),
        catId: Number(catId),
      },
    });

    res.status(201).json({
      success: true,
      favorite: newFav,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in postFavorite: ${error}`,
    });
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const { catId, userId } = req.params;

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_catId: {
          userId: Number(userId),
          catId: Number(catId),
        },
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
        userId_catId: {
          userId: Number(userId),
          catId: Number(catId),
        },
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
  postFavorite,
  deleteFavorite
};
