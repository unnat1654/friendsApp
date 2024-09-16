import { hash, compare } from "bcrypt";
import { generateJWTToken } from "../helpers/authHelpers.js";
import { userModel } from "../models/userModel.js";



export const signUpController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await hash(password, 12);

        const savedUser = await userModel.create({
            email,
            name,
            password: hashedPassword
        });

        res.status(201).send({
            success: true,
            message: "Signed up successfully",
            token: generateJWTToken(savedUser._id)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while signing up!"
        });
    }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("_id name password");
        if (!user)
            return res.status(404).send({
                success: false,
                message: "User not found!",
            });

        if (!(await compare(password, user.password)))
            return res.status(401).send({
                success: false,
                message: "Passwords do not match."
            });

        res.status(200).send({
            success: true,
            message: "Logged in successfully.",
            name: user.name,
            token: generateJWTToken(user._id)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while logging in!"
        });
    }
};