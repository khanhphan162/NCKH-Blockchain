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
        // await db.delete(schema.materialOptions);
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

        await db.insert(schema.modules).values([
            {
                id: 1,
                title: "Introduction to Blockchain",
                description: "Learn the basics of blockchain",
                courseId: 1,
                order: 1,
            },
            {
                id: 2,
                title: "Blockchain Architecture",
                description: "Understand the architecture of blockchain",
                courseId: 1,
                order: 2,
            },
            {
                id: 3,
                title: "Blockchain Security",
                description: "Learn how to secure blockchain",
                courseId: 1,
                order: 3,
            },
            {
                id: 4,
                title: "Blockchain Applications",
                description: "Explore the applications of blockchain",
                courseId: 1,
                order: 4,
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                title: "What is blockchain?",
                moduleId: 1,
                order: 1,
            },
            {
                id: 2,
                title: "How blockchain works",
                moduleId: 1,
                order: 2,
            },
            {
                id: 3,
                title: "Blockchain types",
                moduleId: 1,
                order: 3,
            },
            {
                id: 4,
                title: "Blockchain components",
                moduleId: 1,
                order: 4,
            },
        ]);

        await db.insert(schema.materials).values([
            {
                id: 1,
                lessonId: 1,
                type: "VIDEO",
                label: "Introduction to blockchain",
                order: 1,
                videoSrc: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            },
            {
                id: 2,
                lessonId: 2,
                type: "VIDEO",
                label: "How blockchain works",
                order: 1,
                videoSrc: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            },
            {
                id: 3,
                lessonId: 3,
                type: "VIDEO",
                label: "Blockchain types",
                order: 1,
                videoSrc: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            },
            {
                id: 4,
                lessonId: 4,
                type: "VIDEO",
                label: "Blockchain components",
                order: 1,
                videoSrc: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();