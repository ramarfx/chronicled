import { axiosClient } from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(_: Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await axiosClient.get(`/guilds/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
    
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }

    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}
