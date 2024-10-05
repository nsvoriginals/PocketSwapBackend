import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
 

dotenv.config()

export const authMiddleware=(req,res,next)=>{
    const header=req.header('Authorization');
    const token =header && header.split(' ')[1];
    
    if(!token){
       return  res.status(401).json({message:"Authentication token is must"})
    }
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err ,user)=>{
            if(err){
                return res.status(403).json({message:"Invalid Token"})
            }
            else{
                res.user=user;
                next();
            }
        } )
    }
}