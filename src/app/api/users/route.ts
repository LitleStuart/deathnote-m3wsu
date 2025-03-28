import { getUsers } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search') ?? '';
    const users = await getUsers(search);
    return NextResponse.json(users);
}