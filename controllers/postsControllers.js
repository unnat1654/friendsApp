import { postsModel } from "../models/postsModel.js";
import { userModel } from "../models/userModel.js";



export const createPostController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { text } = req.body;
        const createdAt = new Date(Date.now());

        await postsModel.create({
            sender: _id,
            text,
            createdAt
        });

        res.status(201).send({
            success: true,
            message: "Post created successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating post!"
        })
    }
};


export const getPostsController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { friends } = await userModel.findById(_id).select("-_id friends");

        const posts = await postsModel
            .find({ sender: { $in: friends } })
            .populate("sender", "_id name")
            .sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: "Posts fetched successfully!",
            posts
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting posts!"
        })
    }
};