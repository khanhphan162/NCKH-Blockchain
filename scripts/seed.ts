import "dotenv/config";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless"

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding the database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.modules);
        await db.delete(schema.lessons);
        await db.delete(schema.materials);
        await db.delete(schema.materialOptions);
        await db.delete(schema.materialProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Blockchain",
                imageSrc: "/bc.svg",
            },
            {
                id: 2,
                title: "Computer Science",
                imageSrc: "/cs.svg",
            },
            {
                id: 3,
                title: "Cyber Security",
                imageSrc: "/cy.svg",
            },
            {
                id: 4,
                title: "Machine Learning",
                imageSrc: "/ml.svg",
            },
        ])

        

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();