import { loginService, registerService } from "../services/authService.js";

export const loginController=async(req,res)=>{
    const {name,password}=req.body;
    try{
        const token =await loginService(name,password);
        if(!token){
            return res.status(401).json({message:"User could not login"})
        }
        return res.status(200).json({"auth token":token})
    }catch(error){
        console.error('Login error:', error); 
        return res.status(400).json({ message: error.message || "Login failed" });
    }

    
}
export const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await registerService(name, email, password);
        return res.status(201).json({ message: "Registration successful", user }); // Send success response
    } catch (error) {
        console.error('Registration error:', error); // Log the error
        return res.status(400).json({ message: error.message || "Registration failed" }); // Send error response
    }
}