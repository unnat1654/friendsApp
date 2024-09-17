import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config.js";
import { authRouter } from "./routes/authRouter.js";
import { hobbiesRouter } from "./routes/hobbiesRouter.js";
import { requestsRouter } from "./routes/requestsRouter.js";
import { friendsRouter } from "./routes/friendsRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, "./dist")));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

//connect to mongodb
connectDB();

//Routes
app.use("/api/auth", authRouter);
app.use("/api/hobby", hobbiesRouter);
app.use("/api/request", requestsRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/post",postsRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});