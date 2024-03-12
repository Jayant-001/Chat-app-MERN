import asyncHandler from "express-async-handler";
import Joi from "joi";
import User from "../models/userModel.js";
import { generateAccessToken } from "../services/tokenService.js";
import { hashPassword, verifyPassword } from "../services/passwordService.js";

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

export const registerController = asyncHandler(async (req, res) => {
    const { name, email, password, profilePicture } = req.body;

    try {
        const { error } = registerSchema.validate({ name, email, password });

        if (error)
            return res.status(400).json({ error: error.details[0].message });

        const isUserExists = await User.findOne({ email });

        if (isUserExists)
        return res.status(403).json({ error: "User alrealy exists" });
        
        const passwordHash = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password : passwordHash,
            profilePicture,
        });

        res.status(201).send();
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error.message);
    }
});

export const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = loginSchema.validate({ email, password });

        if (error)
            return res.status(400).json({ error: error.details[0].message });

        const isUserExists = await User.findOne({ email });

        if (!isUserExists)
            return res.status(401).json({ error: "Invalid credentials" });

        const isPasswordCorrect = await verifyPassword(password, isUserExists.password);

        if(!isPasswordCorrect) 
            return res.status(401).json({ error: "Invalid credentials" });

        const token = generateAccessToken(isUserExists);

        res.status(200).json({ token });
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error.message);
    }
});
