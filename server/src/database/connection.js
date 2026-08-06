import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(" MongoDB Connected");
    console.log(` Database: ${connection.connection.name}`);
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;