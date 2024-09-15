import express from "express";
import { connectDB } from "./config.js";
import { authRouter } from "./routes/authRoutes.js";
import { hobbiesRouter } from "./routes/hobbiesRouter.js";
import { requestsRouter } from "./routes/requestsRouter.js";
import { friendsRouter } from "./routes/friendsRouter.js";


dotenv.config();

const app = express();

//middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(morgan("dev"));

//connect to mongodb
connectDB();

//Routes
app.use("/api/auth", authRouter);
app.use("/api/hobby", hobbiesRouter);
app.use("/api/request", requestsRouter);
app.use("/api/friends", friendsRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});