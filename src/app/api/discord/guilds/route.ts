import { axiosClient } from "@/libs/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axiosClient.get("/users/@me/guilds");

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}
