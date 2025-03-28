import { addUser } from "@/db";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { nickname, description } = await req.json() as User;
    const addedUser = await addUser(nickname, description);
    return NextResponse.json(addedUser);
}