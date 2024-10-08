import { Router } from "express";
import { loginValidate, signupValidate } from "../middlewares/authMiddlewares.js";
import { loginController, signUpController } from "../controllers/authControllers.js";


const authRouter = Router();


authRouter.post("/signup", signupValidate, signUpController);

authRouter.post("/login", loginValidate, loginController);


export { authRouter };