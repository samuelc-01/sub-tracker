import { config } from "dotenv";

config({
    path: `.env.${process.env.NODE_ENV || "development"}.local`
});

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 1000;
