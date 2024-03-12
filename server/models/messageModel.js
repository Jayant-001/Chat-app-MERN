import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    content: {
        type: String,
        trim: true
    }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema);
export default Message;