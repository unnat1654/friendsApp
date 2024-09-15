import { Schema, model } from "mongoose";


const requestsSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true,
        immutable: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true,
        immutable: true
    },

});

export const requestsModel = model("requests", requestsSchema, "requests");