import { requestsModel } from "../models/requestsModel.js";
import { userModel } from "../models/userModel.js";




export const sendRequestController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { user_id } = req.body;

        await requestsModel.create({
            sender: _id,
            receiver: user_id
        });

        res.status(201).send({
            success: true,
            message: "Friend Request send successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while sending request!"
        });
    }
};


export const handleRequestController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { request_id, choice } = req.query;

        const request = await requestsModel.findOne({ _id: request_id, receiver: _id });
        if (!request)
            return res.status(404).send({ success: false, message: "Request not found!" });

        if (choice === "ACCEPT") {
            await userModel.updateOne(
                { _id: _id },
                { $addToSet: { friends: request.sender } }
            );
            await userModel.updateOne(
                { _id: request.sender },
                { $addToSet: { friends: _id } }
            );
        }

        await requestsModel.deleteOne({ _id: request_id });

        res.status(200).send({
            success: true,
            message: `Request ${choice.toLowerCase()}ed successfully!`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while handling request!"
        });
    }
};


export const getRequestsController = async (req, res) => {
    try {
        const { _id } = req.user;

        const requests = await requestsModel
            .find({ receiver: _id })
            .select("_id sender")
            .populate("sender", "_id name");

        res.status(200).send({
            success: true,
            message: "Requests found successfully!",
            requests
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting requests!"
        });
    }
};