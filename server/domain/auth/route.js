import express from "express";
import { registerUser, verifyUser } from "./controller.js";
const router = express.Router();

router.post("/login", verifyUser);

router.post("/signup", registerUser);

export default router;
