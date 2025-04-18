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
    console.log("Seeding the database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.modules);
    await db.delete(schema.lessons);
    await db.delete(schema.materials);
    await db.delete(schema.questions);
    await db.delete(schema.answers);
    await db.delete(schema.materialProgress);
    // Seed Courses
    const insertedCourses = await db.insert(schema.courses).values([
      { title: "Intro to Programming", imageSrc: "/images/programming.png" },
      { title: "Web Development", imageSrc: "/images/webdev.png" },
    ]).returning();

    // Seed Modules
    const insertedModules = await db.insert(schema.modules).values([
      { title: "Getting Started", description: "Introduction to programming concepts and tools.", courseId: insertedCourses[0].id, order: 1 },
      { title: "Control Structures", description: "Understanding loops, conditionals, and logic.", courseId: insertedCourses[0].id, order: 2 },
      { title: "HTML & CSS", description: "Basics of web page structure and styling.", courseId: insertedCourses[1].id, order: 1 },
      { title: "JavaScript Fundamentals", description: "Core concepts of JavaScript for the web.", courseId: insertedCourses[1].id, order: 2 },
    ]).returning();

    // Seed Lessons
    const insertedLessons = await db.insert(schema.lessons).values([
      { title: "What is Programming?", moduleId: insertedModules[0].id, order: 1 },
      { title: "Setting Up Your Environment", moduleId: insertedModules[0].id, order: 2 },
      { title: "If Statements & Loops", moduleId: insertedModules[1].id, order: 1 },
      { title: "HTML Basics", moduleId: insertedModules[2].id, order: 2 },
      { title: "CSS Selectors", moduleId: insertedModules[2].id, order: 3 },
      { title: "Intro to JS", moduleId: insertedModules[3].id, order: 1 },
      { title: "Variables & Functions", moduleId: insertedModules[3].id, order: 2 },
    ]).returning();

    // Seed Materials
    const insertedMaterials = await db.insert(schema.materials).values(
      insertedLessons.flatMap((lesson, index) => {
        const materialCount = (index % 3) + 1;
        return Array.from({ length: materialCount }).map((_, i) => {
          const type = materialTypes[(i + index) % materialTypes.length];
          return {
            lessonId: lesson.id,
            type,
            content: `${type} content for lesson ${lesson.title} #${i + 1}`,
            order: i + 1,
            videoSrc: type === "VIDEO" ? `https://example.com/video/lesson-${lesson.id}-${i + 1}` : null,
            imageSrc: i % 2 === 0 ? `https://example.com/image/lesson-${lesson.id}-${i + 1}.jpg` : null,
            audioSrc: i % 3 === 0 ? `https://example.com/audio/lesson-${lesson.id}-${i + 1}.mp3` : null,
          };
        });
      })
    ).returning();

    // Seed Questions
    const insertedQuestions = await db.insert(schema.questions).values(
      insertedMaterials.map((material, i) => ({
        materialId: material.id,
        content: `What is the correct answer for material ${material.id}?`,
        imageSrc: i % 2 === 0 ? `https://example.com/image/question-${material.id}.jpg` : null,
        audioSrc: i % 3 === 0 ? `https://example.com/audio/question-${material.id}.mp3` : null,
      }))
    ).returning();

    // Seed Answers
    const answerData = insertedQuestions.flatMap((question, qIndex) => {
      const correctIndex = qIndex % 4;
      return Array.from({ length: 4 }).map((_, index) => ({
        questionId: question.id,
        content: `Option ${index + 1} for question ${question.id}`,
        correct: index === correctIndex,
        imageSrc: index % 2 === 0 ? `https://example.com/image/answer-${question.id}-${index + 1}.jpg` : null,
        audioSrc: index % 3 === 0 ? `https://example.com/audio/answer-${question.id}-${index + 1}.mp3` : null,
      }));
    });

    await db.insert(schema.answers).values(answerData);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();