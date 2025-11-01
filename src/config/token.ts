import jwt from "jsonwebtoken"

const generateToken = (userId: number, userEmail: string) => {
    const JWT_TOKEN = process.env.JWT_TOKEN!

    return jwt.sign({
        user: userId,
        email: userEmail
    }, JWT_TOKEN, {
       expiresIn: "3h"
    })
}

export default generateToken;