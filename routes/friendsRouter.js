import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { removeFriendsValidate } from "../middlewares/friendsMiddlewares.js";
import { getFriendRecommendationController, getFriendsController, removeFriendController } from "../controllers/friendsControllers.js";


const friendsRouter = Router();


friendsRouter.get("/get-mutual-friends", isLoggedIn, getFriendRecommendationController);

friendsRouter.get("/get-friends", isLoggedIn, getFriendsController);

friendsRouter.patch("/remove-friend", isLoggedIn, removeFriendsValidate, removeFriendController);


export { friendsRouter };