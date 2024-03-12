import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// http:localhost:5000/api/users
export const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.userId).select(
            "_id name email profilePicture"
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error.message);
    }
});

// send all users except me
// http:localhost:5000/api/users/all?search=jayant
export const getAllUsers = asyncHandler(async (req, res) => {
    // console.log(req.userId);
    try {
        const keyword = req.query.search
            ? {
                  $or: [
                      { name: { $regex: req.query.search, $options: "i" } },
                      { email: { $regex: req.query.search, $options: "i" } },
                  ],
              }
            : {};

        const users = await User.find(keyword)
            .find({ _id: { $ne: req.userId } })
            .select("_id name email profilePicture");

        res.status(200).json(users);
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error.message);
    }
});
