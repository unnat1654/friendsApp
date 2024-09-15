import { userModel } from "../models/userModel.js";



export const removeFriendsValidate = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const userExists = await userModel.exists({ _id: user_id });
        if (!userExists)
            return res.status(400).send({ success: false, message: "User not found!" });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while removing friend!"
        });
    }
};