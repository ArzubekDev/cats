import prisma from "../../config/prisma";
const getAllCats = async (req, res) => {
    try {
        const cats = await prisma.cat.findMany();
        res.status(200).json({
            success: true,
            cats
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in ${error}`
        });
    }
};
export default {
    getAllCats
};
