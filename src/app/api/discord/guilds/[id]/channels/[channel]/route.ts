import { axiosClient } from "@/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;

  try {
    const response = await axiosClient.get(`/channels/${channel}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
