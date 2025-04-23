import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const materialTypes = ["READING", "VIDEO", "QUIZ", "ASSIGNMENT", "PROJECT"] as const;

type MaterialType = (typeof materialTypes)[number];

const main = async () => {
    try {
        console.log("🌱 Seeding database...");

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

        // Create a course
        const [courseData] = await db.insert(schema.courses).values([
            {
                title: "Web Development Fundamentals",
                imageSrc: "/course-images/web-dev.jpg",
            }
        ]).returning();

        console.log(`✅ Created course: ${courseData.title}`);
        // Create modules
        const moduleData = await db.insert(schema.modules).values([
            {
                title: "Module 1",
                description: "Introduction to HTML and CSS",
                courseId: courseData.id,
                order: 1
            },
            {
                title: "Module 2",
                description: "JavaScript Basics",
                courseId: courseData.id,
                order: 2
            }
        ]).returning();

        console.log(`✅ Created ${moduleData.length} modules`);

        // Create lessons
        const lessonData = await db.insert(schema.lessons).values([
            {
                title: "HTML Fundamentals",
                moduleId: moduleData[0].id,
                order: 1
            },
            {
                title: "CSS Styling",
                moduleId: moduleData[0].id,
                order: 2
            },
            {
                title: "JavaScript Introduction",
                moduleId: moduleData[1].id,
                order: 1
            }
        ]).returning();

        console.log(`✅ Created ${lessonData.length} lessons`);

        // Create materials for HTML Fundamentals lesson
        const htmlMaterials = await db.insert(schema.materials).values([
            {
                lessonId: lessonData[0].id,
                type: "READING",
                content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
                order: 1
            },
            {
                lessonId: lessonData[0].id,
                type: "VIDEO",
                content: "Introduction to HTML Tags",
                videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                order: 2
            },
            {
                lessonId: lessonData[0].id,
                type: "QUIZ",
                content: "HTML Basics Quiz",
                order: 3
            },
            {
                lessonId: lessonData[0].id,
                type: "ASSIGNMENT",
                content: "Create a simple HTML page with headings, paragraphs, and lists.",
                order: 4
            }
        ]).returning();

        console.log(`✅ Created ${htmlMaterials.length} materials for HTML lesson`);

        // Create materials for CSS lesson
        const cssMaterials = await db.insert(schema.materials).values([
            {
                lessonId: lessonData[1].id,
                type: "READING",
                content: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
                order: 1
            },
            {
                lessonId: lessonData[1].id,
                type: "PROJECT",
                content: "Style a webpage using various CSS properties including colors, fonts, and layouts.",
                imageSrc: "/project-images/css-project.jpg",
                order: 2
            }
        ]).returning();

        console.log(`✅ Created ${cssMaterials.length} materials for CSS lesson`);

        // Create materials for JavaScript lesson
        const jsMaterials = await db.insert(schema.materials).values([
            {
                lessonId: lessonData[2].id,
                type: "READING",
                content: "JavaScript is a programming language that enables interactive web pages.",
                order: 1
            },
            {
                lessonId: lessonData[2].id,
                type: "VIDEO",
                content: "Getting Started with JavaScript",
                videoSrc: "https://www.youtube.com/embed/W6NZfCO5SIk",
                order: 2
            }
        ]).returning();

        console.log(`✅ Created ${jsMaterials.length} materials for JavaScript lesson`);

        // Create questions for HTML quiz
        const htmlQuizQuestions = await db.insert(schema.questions).values([
            {
                materialId: htmlMaterials[2].id,
                content: "What does HTML stand for?",
            },
            {
                materialId: htmlMaterials[2].id,
                content: "Which HTML element is used for the largest heading?",
            },
            {
                materialId: htmlMaterials[2].id,
                content: "Which tag is used to create an unordered list?",
            }
        ]).returning();

        console.log(`✅ Created ${htmlQuizQuestions.length} questions for HTML quiz`);

        // Add answers for HTML quiz questions
        await db.insert(schema.answers).values([
            // Question 1 answers
            {
                questionId: htmlQuizQuestions[0].id,
                content: "HyperText Markup Language",
                correct: true
            },
            {
                questionId: htmlQuizQuestions[0].id,
                content: "High Tech Modern Language",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[0].id,
                content: "Home Tool Markup Language",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[0].id,
                content: "Hyperlinks and Text Markup Language",
                correct: false
            },

            // Question 2 answers
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<h1>",
                correct: true
            },
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<heading>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<h6>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<head>",
                correct: false
            },

            // Question 3 answers
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<ul>",
                correct: true
            },
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<ol>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<list>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<li>",
                correct: false
            }
        ]);

        console.log("✅ Created answers for HTML quiz questions");

        // Create questions for HTML assignment
        const htmlAssignmentQuestions = await db.insert(schema.questions).values([
            {
                materialId: htmlMaterials[3].id,
                content: "Which element should you use for the main heading of your page?",
            },
            {
                materialId: htmlMaterials[3].id,
                content: "How would you create a hyperlink to www.example.com with the text 'Visit Example'?",
            }
        ]).returning();

        console.log(`✅ Created ${htmlAssignmentQuestions.length} questions for HTML assignment`);

        // Add answers for HTML assignment questions
        await db.insert(schema.answers).values([
            // Question 1 answers
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<h1>Main Heading</h1>",
                correct: true
            },
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<p>Main Heading</p>",
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<main>Main Heading</main>",
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<title>Main Heading</title>",
                correct: false
            },

            // Question 2 answers
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<a href="www.example.com">Visit Example</a>',
                correct: true
            },
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<link>Visit Example</link>',
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<href="www.example.com">Visit Example</href>',
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<hyperlink url="www.example.com">Visit Example</hyperlink>',
                correct: false
            }
        ]);

        console.log("✅ Created answers for HTML assignment questions");

        console.log("🌱 Seeding completed successfully!");
    } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();