import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tokenGenerator } from "../../tokenGenerator.js";

dotenv.config()

const prisma = new PrismaClient();


export const loginService = async (name, password) => {

    const user = await prisma.user.findUnique({
        where: { name: name,password:password }
    })

    if (!user) {
        throw new Error('User not found');
    }





    const token = tokenGenerator(user.id)

    return token

}

export const registerService = async (name, email, password) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                balance: 25000
            },
        })
        return user;
    } catch (err) {
        throw new Error("could not process")
    }


}