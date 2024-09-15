import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { handleRequestValidate, sendRequestValidate } from "../middlewares/requestsMiddlewares.js";
import { getRequestsController, handleRequestController, sendRequestController } from "../controllers/requestsControllers.js";


const requestsRouter = Router();


requestsRouter.post("/send-request", isLoggedIn, sendRequestValidate, sendRequestController);

requestsRouter.delete("/handle-request", isLoggedIn, handleRequestValidate, handleRequestController);

requestsRouter.post("/get-requests", isLoggedIn, getRequestsController);


export { requestsRouter };