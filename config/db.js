import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config({ path: "./../config.env" });
console.log(process.env)

const DB = process.env.MONGO_URL.replace("<password>", process.env.PASSWORD);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}.bgMagenta.white`
    );
  } catch (err) {
    console.log(`MongoDB Error ${error}.bgRed.white`);
  }
};

export default connectDB;