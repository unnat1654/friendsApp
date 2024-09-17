import { requestsModel } from "../models/requestsModel.js";
import { userModel } from "../models/userModel.js";



export const searchUsersController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { search } = req.query;

        const myDetails = await userModel.findById(_id).select("-_id friends hobbies");
        if (!myDetails)
            return res.status(404).send({
                success: false,
                message: "User not found!"
            });

        let requestedUsers = await requestsModel.find({ sender: _id }).select("-_id receiver");
        requestedUsers = requestedUsers.map(requestedUser => requestedUser.receiver);

        const nonFriendUsers = await userModel.find({
            _id: { $ne: _id, $nin: [...myDetails.friends, ...requestedUsers] },
            ...(search ? { name: { $regex: search, $options: 'i' } } : {})
        }).select("_id name friends hobbies");

        const myFriendsSet = new Set(myDetails.friends);
        const myHobbiesSet = new Set(myDetails.hobbies);

        const recommendations = nonFriendUsers.map(user => {
            const mutualFriends = user.friends.reduce((count, friend) =>
                myFriendsSet.has(friend) ? count + 1 : count, 0);

            const sharedHobbies = user.hobbies.reduce((count, hobby) =>
                myHobbiesSet.has(hobby) ? count + 1 : count, 0);

            return {
                _id: user._id,
                name: user.name,
                mutualFriends,
                sharedHobbies,
            };
        }).filter(({ mutualFriends, sharedHobbies }) => mutualFriends > 0 || sharedHobbies > 0)
            .sort((a, b) => (2 * b.mutualFriends + b.sharedHobbies) - (2 * a.mutualFriends + a.sharedHobbies));

        res.status(200).send({
            success: true,
            message: "Recommendations fetched successfully!",
            recommendations
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while searching friends!"
        });
    }
};


export const getFriendsController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { friends } = await userModel
            .findById(_id)
            .select("-_id friends")
            .populate("friends", "_id name");

        res.status(200).send({
            success: true,
            message: "Friends found successfully!",
            friends
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting friends!"
        });
    }
};


export const removeFriendController = async (req, res) => {
    try {
        const { _id } = req.user;

        const { user_id } = req.body;

        const result = await userModel.updateOne(
            { _id },
            { $pull: { friends: user_id } }
        );
        if (result.modifiedCount === 0)
            return res.status(404).send({
                success: false,
                message: "Friend not found!"
            });

        res.status(200).send({
            success: true,
            message: "Friend removed successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while removing friend!"
        });
    }
};