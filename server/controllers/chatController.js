import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

// if chat with user id exists return otherwise create a new chat with userId and return
export const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId)
        return res
            .send(400)
            .json({ error: "UserId param not set with req body" });

    let isChatExists = await Chat.find({
        isGroupChat: false, // fetching one to one chat so it should not be a group chat
        // matching users current user with req.body.userId
        $and: [
            { users: { $elemMatch: { $eq: req.userId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password") // find user with userId
        .populate("latestMessage"); // find message with messageId

    isChatExists = await User.populate(isChatExists, {
        path: "latestMessage.senderId",
        select: "name profilePicture email",
    });

    // if chat already exists return the first chat
    if (isChatExists.length > 0) {
        return res.status(200).send(isChatExists[0]);
    }

    // if chat not exists create a new chat
    var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.userId, userId],
    };

    // create a new chat and then send response with users information
    try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
        );

        res.status(200).send(fullChat);
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error(error.message);
    }
});

// fetch all chats of current user
export const getAllChats = expressAsyncHandler(async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.userId } },
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        const chatsWithMessages = await User.populate(chats, {
            path: "latestMessage.senderId",
            select: "name profilePicture email",
        });

        res.status(200).send(chatsWithMessages);
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error(error.message);
    }
});

export const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ error: "users are required" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send({ error: "More than 1 users are required" });
    }

    users.push(req.userId);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.userId,
        });

        const fullGroupChat = await Chat.find({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(fullGroupChat);
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error(error.message);
    }
});

export const renameGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    // update chatName where _id === chatId
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true } // to return updatedChat with new chatName otherwise it will return old chat object
    )
        .populate("users", "-password") // include users object
        .populate("groupAdmin", "-password"); // include groupAdmin user object

    // if updatedChat is null
    if (!updatedChat) return res.status(404).send({ error: "Chat not found" });

    res.status(200).json(updatedChat);
});

export const removeFromGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    );

    if (!updatedChat) return res.status(404).send({ error: "Chat not found" });

    return res.status(200).json(updatedChat);
});

export const addToGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    );

    if (!updatedChat) return res.status(404).send({ error: "Chat not found" });

    return res.status(200).json(updatedChat);
});
