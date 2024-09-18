import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { createPostValidate } from "../middlewares/postsMiddelwares.js";
import { createPostController, getPostsController } from "../controllers/postsControllers.js";

const postsRouter = Router();


postsRouter.post("/create-post", isLoggedIn, createPostValidate, createPostController);

postsRouter.get("/get-posts", isLoggedIn, getPostsController);


export { postsRouter };