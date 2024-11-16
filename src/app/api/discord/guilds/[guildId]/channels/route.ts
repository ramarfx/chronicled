import { axiosClient } from "@/libs/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const guildId = req.nextUrl.pathname.split("/")[4];

  if (!guildId || typeof guildId !== "string") {
    return NextResponse.json({
      message: "guildId is required and must be a string",
    });
  }

  try {
    const response = await axiosClient.get(
      `/guilds/${guildId}/channels`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}
