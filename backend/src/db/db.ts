import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}`
    );
    return connectionInstance.connection.host;
  } catch (error) {
    return error;
  }
};
export default databaseConnection;
