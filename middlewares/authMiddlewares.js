import JWT from "jsonwebtoken";
import { isValidName, isValidEmail } from "../helpers/authHelpers.js";
import { userModel } from "../models/userModel.js";



export const isLoggedIn = (req, res, next) => {
    try {
        if (!req.headers.authorization)
            return res.status(400).send({
                success: false,
                message: "Authentication Token not found"
            });

        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Authentication token not authorized"
        });
    }
};


export const signupValidate = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !isValidEmail(email))
            return res.status(400).send({ success: false, message: "Email missing!" });
        if (!password || password.length < 6)
            return res.status(400).send({ success: false, message: "Password missing!" });
        if (!name || !isValidName(name))
            return res.status(400).send({ success: false, message: "Name missing!" });

        const userExists = await userModel.exists({ email });
        if (userExists)
            return res.status(400).send({ success: false, message: "Email already registered!" });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while signing up user!"
        });
    }
};


export const loginValidate = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email)
            return res.status(400).send({ success: false, message: "Email missing!" });
        if (!password || password.length < 6)
            return res.status(400).send({ success: false, message: "Password missing!" });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while logging in!"
        });
    }
};