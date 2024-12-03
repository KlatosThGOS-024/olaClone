import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const dbConnection = await mongoose.connect(`${process.env.DATABASE_URI}`);

    return dbConnection.ConnectionStates;
  } catch (error) {
    return error;
  }
};
export default databaseConnection;
