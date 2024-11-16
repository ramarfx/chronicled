import { axiosClient } from "@/libs/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await axiosClient.get("/users/@me/guilds");

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}
