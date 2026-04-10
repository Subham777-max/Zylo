import { config } from "./config";

export const connectDB = async () => {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}