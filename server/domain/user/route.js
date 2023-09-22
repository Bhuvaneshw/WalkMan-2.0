import express from "express";
import {registerUser, verifyUser} from "./controller.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const {msg, token, name, email} = await verifyUser(req.body);
        res.status(200).json({msg, token, name, email});
    } catch (e) {
        res.status(401).json({msg: e.message});
    }
});

router.post("/signup", async (req, res) => {
    try {
        const {msg, token} = await registerUser(req.body);
        res.json({msg, token});
    } catch (e) {
        res.status(401).json({msg: e.message});
    }
});

export default router;
