import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getFavorite = async (req: Request, res: Response) => {
  try {
    const { catId, userId } = req.params;

    const fav = await prisma.favorite.findUnique({
      where: { id: Number(catId), userId: Number(userId) },
    });

    res.status(200).json({
      success: true,
      fav,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getFavorite: ${error}`,
    });
  }
};

const postFavarite = async (req: Request, res: Response) => {
  try {
    const { catId, userId } = req.params;
    const {
      name,
      description,
      breed,
      price,
      age,
      gender,
      imageUrl,
      isAvailable,
      discount,
    } = req.body;
    // const addNewFav = await prisma.favorite.createMany({
        
    // })
  } catch (error) {}
};
export default {
  getFavorite,
};
