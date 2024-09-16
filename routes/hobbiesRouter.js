import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { addHobbyValidate, removeHobbyValidate } from "../middlewares/hobbiesMiddlewares.js";
import { addHobbyController, getHobbiesController, removeHobbyController } from "../controllers/hobbiesControllers.js";


const hobbiesRouter = Router();



hobbiesRouter.patch("/add-hobby", isLoggedIn, addHobbyValidate, addHobbyController);

hobbiesRouter.patch("/remove-hobby", isLoggedIn, removeHobbyValidate, removeHobbyController);

hobbiesRouter.get("/get-hobbies", isLoggedIn, getHobbiesController);



export { hobbiesRouter };