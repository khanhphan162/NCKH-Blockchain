import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("🌱 Reseting database...");

        // Clear existing data
        await db.delete(schema.answers);
        await db.delete(schema.questions);
        await db.delete(schema.materialProgress);
        await db.delete(schema.materials);
        await db.delete(schema.lessons);
        await db.delete(schema.modules);
        await db.delete(schema.userProgress);
        await db.delete(schema.courses);

        console.log("🧹 Cleared existing data");
    } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the database");
  }
};

main();