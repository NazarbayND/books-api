import dotenv from "dotenv";
import prisma from "../utils/db";

dotenv.config();

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};
