import { getUserByNickname } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ nickname: string }> }
) {
    const { nickname } = await params;
    const user = await getUserByNickname(nickname);
    return NextResponse.json(user ?? { error: 'Player not found. Unluck :(' }, { status: 404 });
}