import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_name}`);
        console.log(`Database connected successfully`);
    }
    catch (error) {
        console.log("Error while connecting to database", error);
        process.exit(1);
    }
}

export default connectDB;