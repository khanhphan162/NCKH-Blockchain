import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";

import {
    courses,
    materialProgress,
    modules,
    userProgress
} from "@/db/schema";

import { eq } from "drizzle-orm";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getModules = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    //TODO: Confirm whether order is needed
    const data = await db.query.modules.findMany({
        where: eq(modules.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    materials: {
                        with: {
                            materialProgress: {
                                where: eq(materialProgress.userId, userId),
                            }
                        }
                    },
                }
            },
        },
    });

    const normalizedData = data.map((module) => {
        const lessonsWithCompletedStatus = module.lessons.map((lesson) => {
            const allCompletedMaterials = lesson.materials.every((material) => {
                return material.materialProgress
                    && material.materialProgress.length > 0
                    && material.materialProgress.every((progress) => progress.completed);
            });
            return {
                ...lesson,
                completed: allCompletedMaterials,
            }
        });
        return{
            ...module,
            lessons: lessonsWithCompletedStatus,
        }
    });

    return normalizedData;
});

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        // TODO: Populate units and lessons
    });

    return data;
});