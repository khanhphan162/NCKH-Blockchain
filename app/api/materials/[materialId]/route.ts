import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { materials } from "@/db/schema"
import { isAdmin } from "@/lib/admin";


export const GET = async(
    req: Request,
    {params} : {params: {materialId: number} },
) => {
    if (!isAdmin()){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { materialId } = await params

    const data = await db.query.materials.findFirst({
        where: eq(materials.id, materialId),
    });

    return NextResponse.json(data);
}

export const PUT = async(
    req: Request,
    {params} : {params: {materialId: number}},
) => {
    if (!isAdmin()){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { materialId } = await params
    const body = await req.json();
    const data = await db.update(materials).set({
        ...body,
    }).where(eq(materials.id, materialId)).returning();

    return NextResponse.json(data[0]);
}

export const DELETE = async(
    req: Request,
    {params} : {params: {materialId: number}},
) => {
    if (!isAdmin()){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { materialId } = await params
    const data = await db.delete(materials)

    .where(eq(materials.id, materialId)).returning();

    return NextResponse.json(data[0]);
}