import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongodb database ${connection.host}`);
  } catch (error) {
    console.log(`Error in Mongodb Connection:${error}`);
  }
};

