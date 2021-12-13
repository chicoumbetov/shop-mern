import express from "express";
import {signin, signup} from "../controllers/auth.js";
const router = express.Router();

//REGISTER
router.post("/register", signup);

//LOGIN
router.post('/login', signin);

export default router;
