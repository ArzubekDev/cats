import { Request, Response } from "express";
import prisma from "../../config/prisma.js";

const getAllCats = async (req: Request, res: Response) => {
  try {
    const cats = await prisma.cat.findMany();

    res.status(200).json({
      success: true,
      cats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getAllCats: ${error}`,
    });
  }
};

const getOneCat = async (req: Request, res: Response) => {
  try {
    const { catId } = req.params;

    if (!catId) {
      return res.status(401).json({
        success: false,
        message: `Kot po id:${catId} ne naiden`,
      });
    }

    const findUnique = await prisma.cat.findUnique({
      where: { id: Number(catId) },
    });

    res.status(200).json({
      success: true,
      findUnique,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getOneCat: ${error}`,
    });
  }
};

const postCats = async (req: Request, res: Response) => {
  try {
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

    if (
      !name ||
      !description ||
      !breed ||
      !price ||
      !age ||
      !gender ||
      !imageUrl ||
      !isAvailable ||
      !discount
    ) {
      return res.status(401).json({
        success: false,
        message: "fill in all fields",
      });
    }

    const newCat = await prisma.cat.create({
      data: {
        name,
        description,
        breed,
        price,
        age,
        gender,
        imageUrl,
        isAvailable,
        discount,
      },
    });
    res.status(200).json({
      success: true,
      newCat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in PostCats: ${error}`,
    });
  }
};

const deletedCatCard = async (req: Request, res: Response) => {
  try {
    const { catId } = req.params;
    
    if (!catId) {
      return res.status(401).json({
        success: false,
        message: `Kot po id:${catId} ne naiden`,
      });
    }
    const deleted = await prisma.cat.delete({ where: { id: Number(catId) } });

    if (!deleted) {
      return res.status(401).json({
        success: false,
        message: "Invalid cat ID",
      });
    }

    res.status(200).json({
      success: true,
      deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in deletedCatCard: ${error}`,
    });
  }
};

const updatedCatCard = async (req: Request, res: Response) => {
  try {
    const { catId } = req.params;
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

    if (!catId) {
      return res.status(401).json({
        success: false,
        message: `Kot po id:${catId} ne naiden`,
      });
    }

    const findUnique = await prisma.cat.findUnique({
      where: {id: Number(catId)}
    })

    if(!findUnique){
      return res.status(404).json({
        success: false, 
        message: `Takoi kot ne sushestvuet!!!`
      })
    }

    const updated = await prisma.cat.update({
      where: { id: Number(catId) },
      data: {
        name,
        description,
        breed,
        price,
        age,
        gender,
        imageUrl,
        isAvailable,
        discount,
      },
    });

    res.status(200).json({
      success: true,
      updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in updatedCatCard: ${error}`,
    });
  }
};

export default {
  getAllCats,
  postCats,
  deletedCatCard,
  updatedCatCard,
  getOneCat,
};
