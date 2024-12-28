import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = () => {
    mongoose.connect(process.env.DATABASE).then(() => console.log('connecting to database successfully'))
}