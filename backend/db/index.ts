import {} from "dotenv/config";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
dotenv.config();

// @ts-ignore
// eslint-disable-next-line
const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, {
  ssl: true,
  max: 10,
});
export const db = drizzle(client);
