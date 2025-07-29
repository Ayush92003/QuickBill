import express from "express";
import {register,login,logout, deleteAccount} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.delete('/delete-account',protectRoute,deleteAccount);
router.get("/user", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({user});
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});


export default router;