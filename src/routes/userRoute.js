import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUsersController, getCurrentUserController, paymentController } from "../controllers/userController.js";




const router=express.Router();


router.get("/allusers",authMiddleware,getAllUsersController);
router.post("/payment",authMiddleware,paymentController);
router.get("/currentuser",authMiddleware,getCurrentUserController)


export default router;