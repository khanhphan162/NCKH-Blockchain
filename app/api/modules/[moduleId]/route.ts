import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { modules } from "@/db/schema"
import { isAdmin } from "@/lib/admin";


export const GET = async(
    req: Request,
    {params} : {params: {moduleId: number} },
) => {
    if (!isAdmin()){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.query.modules.findFirst({
        where: eq(modules.id, params.moduleId),
    });

    return NextResponse.json(data);
}

export const PUT = async(
    req: Request,
    {params} : {params: {moduleId: number}},
) => {
    if (!isAdmin()){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const data = await db.update(modules).set({
        ...body,
    }).where(eq(modules.id, params.moduleId)).returning();

    return NextResponse.json(data[0]);
}

export const DELETE = async(
    req: Request,
    {params} : {params: {moduleId: number}},
) => {
    if (!isAdmin()){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.delete(modules)
    .where(eq(modules.id, params.moduleId)).returning();

    return NextResponse.json(data[0]);
}