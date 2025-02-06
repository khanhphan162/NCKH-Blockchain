import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";

import {
    courses,
    lessons,
    materialProgress,
    modules,
    userProgress
} from "@/db/schema";

import { asc, eq } from "drizzle-orm";
import { ppid } from "process";

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
        // TODO: Populate modules and lessons
    });

    return data;
});

export const getCourseProgress = cache(async () =>{
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId){
        return null;
    }

    const modulesInActiveCourse = await db.query.modules.findMany({
        orderBy: (modules, {asc}) => [asc(modules.order)],
        where: eq(modules.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, {asc}) => [asc(lessons.order)],
                with:{
                    materials: {
                        with: {
                            materialProgress: {
                                where: eq(materialProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    })
    const firstUncompletedLesson = modulesInActiveCourse.flatMap((module) => module.lessons)
    .find((lesson) =>{
        return lesson.materials.some((material) =>{
            // TODO: If something does not work, check the last if clause
            return !material.materialProgress || material.materialProgress.length === 0 || material.materialProgress.some((progress) => progress.completed === false);
        })
    })

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    }
})

export const getLesson = cache(async (id?: number) =>{
    const {userId} = await auth();

    if (!userId){
        return null;
    }

    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            materials: {
                orderBy: (materials, {asc}) => [asc(materials.order)],
                with:{
                    materialProgress: {
                        where: eq(materialProgress.userId, userId)
                    }
                }
            }
        }
    })

    if (!data || !data.materials){
        return null;
    }

    const normalizedMaterials = data.materials.map((material) =>{
            // TODO: If something does not work, check the last if clause
        const completed = material.materialProgress 
        && material.materialProgress.length > 0
        && material.materialProgress.every((progress) => progress.completed);

        return {...material, completed};
    })

    return {...data, materials: normalizedMaterials}
})

export const getLessonPercentage = cache(async () =>{
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId){
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);
    
    if (!lesson){
        return 0;
    }

    const completedMaterials = lesson.materials.filter((material) => material.completed);
    const percentage = Math.round(
        (completedMaterials.length / lesson.materials.length) *100,
    );

    return percentage;
})