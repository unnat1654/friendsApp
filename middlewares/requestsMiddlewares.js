import { userModel } from "../models/userModel.js";



export const sendRequestValidate = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const { friends } = await userModel.findById(req.user._id).select("-_id friends");
        if (friends.includes(user_id))
            return res.status(400).send({
                success: false,
                message: "User already friends!"
            });

        const requestedAlready = await requestsModel.exists(
            { $or: [{ sender: req.user._id, receiver: user_id }, { sender: user_id, receiver: req.user._id }] }
        );
        if (requestedAlready)
            return res.status(400).send({ success: false, message: "Request Conflict!" });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while sending requests!"
        });
    }
};


export const handleRequestValidate = async (req, res, next) => {
    try {
        const { request_id, choice } = req.body;
        if (!request_id)
            return res.status(400).send({ success: false, message: "Request id missing!" });
        if (!choice || (choice !== "ACCEPT" && choice !== "REJECT"))
            return res.status(400).send({ success: false, message: "choice missing!" });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while handling requests!"
        });
    }
};