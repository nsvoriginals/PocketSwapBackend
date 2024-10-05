import { getAllUsers, getCurrentUser, paymentService } from "../services/userService.js";

export const paymentController=async(req,res)=>{
    const {senderId,recieverId,amount}=req.body;
    try{
        const payment=await paymentService(senderId,recieverId,amount);
        return res.status(200).json({message:"payment Successful"})
    }catch(error){
        return res.status(401).json({message:error.message})
    }
}


export const getAllUsersController=async(req,res)=>{
    try{
        const users=await getAllUsers();
       if(!users){
        return res.json({message:"users not found"})
       }   
       return res.status(200).json(users)
     
    }catch(error){
        return res.status(401).json({message:"ERROR "})
    }
}

export const getCurrentUserController=async(req,res)=>{
    const header=req.header('Authorization');
    const token =header && header.split(' ')[1];
    try{
        const currentUser=await getCurrentUser(token);
        if(!currentUser){
            return res.status(401).json({message:"Current User not found"})
        }
      return res.status(200).json(currentUser);
    }catch(error){
        return res.status(400).json({message:error.message})
        console.log("error")
    }

}