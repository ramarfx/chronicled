import { axiosClient } from "@/libs/axiosClient";
import {NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axiosClient.get("/channels/1146739358532108291/messages");

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}
