import { Schema, model } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 25
    },
    hobbies: {
        type: [String],
        default: []
    },
    friends: {
        type: [Schema.Types.ObjectId],
        ref: "users",
        default: []
    },

});

export const userModel = model("users", userSchema, "users");