
import jwt from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();


export const getCurrentUser = async (token) => {
    if (!token) {
        throw new Error("No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!currentUser) { // Corrected variable name
            throw new Error("User not found");
        }

        return currentUser;
    } catch (error) {
        console.error("Error identifying user:", error);
        throw new Error("Authentication failed"); // This will trigger the catch block in the controller
    }
};

export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany()
        if (!users) {
            throw new Error("No users found")
        }
    return users;
    } catch (error) {
        throw new Error("fetching of users failed")
    }
};





export const paymentService = async (senderId, receiverId, amount) => {
    try {
        const parsedAmount = parseInt(amount, 10);

        if (!senderId || !receiverId || isNaN(parsedAmount) || parsedAmount <= 0) {
            throw new Error("SenderId, ReceiverId must be valid and Amount must be a positive integer.");
        }

        const transaction = await prisma.$transaction(async (prisma) => {
            const sender = await prisma.user.findUnique({
                where: { id: senderId },
            });

            const receiver = await prisma.user.findUnique({
                where: { id: receiverId },
            });

            if (!sender || !receiver) {
                throw new Error("SenderId or ReceiverId not found.");
            }

            if (sender.balance < parsedAmount) {
                throw new Error("Insufficient balance.");
            }

            const updatedSender = await prisma.user.update({
                where: { id: senderId },
                data: { balance: sender.balance - parsedAmount },
            });

            const updatedReceiver = await prisma.user.update({
                where: { id: receiverId },
                data: { balance: receiver.balance + parsedAmount },
            });

            return { updatedSender, updatedReceiver };
        });

        return transaction;
    } catch (error) {
        console.error("Payment processing error:", error.message);
        throw new Error("Payment could not be processed: " + error.message);
    }
};