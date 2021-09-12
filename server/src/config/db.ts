//Implements database connection

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "src/config/config.env" });

const connectDatabase = async (): Promise<void> => {
  const currentDate: Date = new Date();
  const database: string = process.env.DATABASE_URI!.replace(
    /<password>/gi,
    process.env.DATABASE_PASSWORD!
  );
  try {
    await mongoose.connect(database);
    console.log(
      `Database connection successful as of ${currentDate.toLocaleString()}`
    );
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDatabase;
