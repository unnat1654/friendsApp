import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { removeFriendsValidate, searchUsersValidate } from "../middlewares/friendsMiddlewares.js";
import { getFriendsController, removeFriendController, searchUsersController } from "../controllers/friendsControllers.js";


const friendsRouter = Router();

friendsRouter.get("/search-users", isLoggedIn, searchUsersValidate, searchUsersController);

friendsRouter.get("/get-friends", isLoggedIn, getFriendsController);

friendsRouter.patch("/remove-friend", isLoggedIn, removeFriendsValidate, removeFriendController);


export { friendsRouter };