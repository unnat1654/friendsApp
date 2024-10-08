import { userModel } from "../models/userModel.js";



export const addHobbyController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { hobby } = req.body;

        const result = await userModel.updateOne({ _id }, { $addToSet: { hobbies: hobby } });
        if (!result.matchedCount)
            return res.status(404).send({
                success: false,
                message: "User not found!"
            });

        res.status(200).send({
            success: true,
            message: "Hobby added successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while adding hobby!"
        });
    }
};


export const removeHobbyController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { hobby } = req.body;

        const result = await userModel.updateOne(
            { _id },
            { $pull: { hobbies: hobby } }
        );
        if (result.modifiedCount === 0)
            return res.status(404).send({
                success: false,
                message: "Hobby not found or user not found!"
            });

        res.status(200).send({
            success: true,
            message: "Hobby removed successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while removing hobby!"
        });
    }
};


export const getHobbiesController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { hobbies } = await userModel.findById(_id).select("-_id hobbies");

        res.status(200).send({
            success: true,
            message: "Hobbies found successfully!",
            hobbies
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting hobbies!"
        });
    }
};