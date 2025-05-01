"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { materialProgress, materials, userProgress } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";
import { and, eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) =>{
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if(!course.modules.length || !course.modules[0].lessons.length){
        throw new Error("Course is empty");
    }

    const existingUserProgress = await getUserProgress();    

    if (existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/user.png",
        });

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/user.png",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};

export const reduceHearts = async (materialId: number) => {
    const { userId } = await auth();

    if (!userId){
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    const material = await db.query.materials.findFirst({
        where: eq(materials.id, materialId),
    });

    if (!material){
        throw new Error("Material not found");
    }

    const lessonId = material.lessonId;

    const existingMaterialProgress = await db.query.materialProgress.findFirst({
        where: and(
            eq(materialProgress.userId, userId),
            eq(materialProgress.materialId, materialId),
        ),
    });

    const isPractice = !!existingMaterialProgress;

    if (isPractice){
        return {error: "practice"};
    }

    if(!currentUserProgress){
        throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts === 0){
        return {error: "hearts"};
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/certificates");
    revalidatePath("/shop");
    revalidatePath(`/lesson/${lessonId}`);
};

export const markCourseAsCompleted = async () => {
    const { userId } = await auth();
    const currentUserProgress = await getUserProgress();

    if (!userId || !currentUserProgress?.activeCourseId) {
        throw new Error("Unauthorized or no active course");
    }

    await db.update(userProgress).set({
        completed: true,
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
};