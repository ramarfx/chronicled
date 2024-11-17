import { axiosClient } from "@/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axiosClient.get("/applications/@me");

    if (response.status === 200) {
      return NextResponse.json("status ok");
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json("status is not ok");
  }
}
