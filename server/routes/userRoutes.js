import express from "express";
import {
    getUser,
    getAllUsers,
    // getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.get('/all', getAllUsers);
// router.get('/:id', getIserById);

export default router;
