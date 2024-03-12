import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chats from "./data/data.js";
import dbContext from "./config/dbContext.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import verifyUser from "./middlewares/verifyUser.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

dbContext();

const PORT = process.env.PORT || 4000;

app.use('/api/auth/', authRoutes)
app.use('/api/users/', verifyUser, userRoutes)
app.use('/api/chats/', verifyUser, chatRoutes)

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("SErver is listening on PORT: " + PORT);
});
