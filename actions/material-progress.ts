"use server"

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { materialProgress, materials, userProgress } from "@/db/schema";
import {auth} from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertMaterialProgress = async (materialId: number) => {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    
    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    const material = await db.query.materials.findFirst({
        where: eq(materials.id, materialId)
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

    if (currentUserProgress.hearts === 0 && !isPractice){
        return {error: "hearts"};
    }
    if (isPractice){
        await db.update(materialProgress).set({
            completed: true,
        }).where(
            eq(materialProgress.id, existingMaterialProgress.id)
        );

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId));

        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/certificates");
        revalidatePath("/shop");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }
    await db.insert(materialProgress).values({
        materialId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));
    
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/certificates");
    revalidatePath("/shop");
    revalidatePath(`/lesson/${lessonId}`);
}