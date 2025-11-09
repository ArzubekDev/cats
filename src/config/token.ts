import jwt from "jsonwebtoken"

const JWT_TOKEN = process.env.JWT_TOKEN!
export const generateToken = (userId: number, userEmail: string) => {

    return jwt.sign({
        user: userId,
        email: userEmail
    }, JWT_TOKEN, {
       expiresIn: "3h"
    })
}

export const verifyToken = (token: string) => {
return jwt.verify(token, JWT_TOKEN) as {id: string, email: string}
}

