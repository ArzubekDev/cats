import prisma from "../../config/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../../config/token.js";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Бул Email колдонулуп жатат.",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // ✅ Токен түзүү
        const token = generateToken(newUser.id, newUser.email);
        // ✅ Колдонуучуну жана токенди жиберебиз
        res.status(200).json({
            success: true,
            message: "Катталуу ийгиликтүү!!!",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token, // <-- Мына ушул нерсе frontendге керек
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `Error in register ${error}` });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found 404 !!!"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid creadentials!!!"
            });
        }
        const token = generateToken(user.id, user.email);
        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in login ${error}`
        });
    }
};
export default {
    register,
    login
};
