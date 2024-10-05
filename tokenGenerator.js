import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

 export function tokenGenerator(userId){
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT secret key is missing");
    }

    const token =jwt.sign({id:userId},secretKey,{expiresIn:'1h'} );

  return token;
}



