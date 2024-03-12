import express from "express";
import {
    addToGroup,
    accessChat,
    createGroupChat,
    getAllChats,
    removeFromGroup,
    renameGroup,
} from "../controllers/chatController.js";

const router = express.Router();

router.route("/").post(accessChat);
router.route("/").get(getAllChats);
router.route("/group").post(createGroupChat);
router.route("/group/rename").put(renameGroup);
router.route("/group/remove").put(removeFromGroup);
router.route("/group/add").put(addToGroup);

export default router;
