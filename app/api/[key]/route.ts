import { NextRequest, NextResponse } from "next/server";
import redisClient from "../../_lib/redis";

export async function POST(req: NextRequest, {
  params
} : {
  params: Promise<{
    key: string;
  }>
}) {
  try {
    const { key } = await params;
    const value = await req.text();
    await redisClient.set(key, value);
    return new NextResponse("");
  } catch (e) {
    return new NextResponse("", {
      status: 500
    });
  }
}
