import { Schema, model } from "mongoose";


const postsSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true,
        immutable: true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        required:true
    }

});

export const postsModel = model("posts", postsSchema, "posts");