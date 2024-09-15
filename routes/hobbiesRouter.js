import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { removeHobbyValidate, setHobbiesValidate } from "../middlewares/hobbiesMiddlewares.js";
import { getHobbiesController, removeHobbyController, setHobbiesController } from "../controllers/hobbiesControllers.js";


const hobbiesRouter = Router();



hobbiesRouter.patch("/add-hobbies", isLoggedIn, setHobbiesValidate, setHobbiesController);

hobbiesRouter.patch("/remove-hobby", isLoggedIn, removeHobbyValidate, removeHobbyController);

hobbiesRouter.get("/get-hobbies", isLoggedIn, getHobbiesController);



export { hobbiesRouter };