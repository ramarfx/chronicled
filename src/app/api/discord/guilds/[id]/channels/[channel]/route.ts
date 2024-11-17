import { axiosClient } from "@/lib/axiosClient";
import { NextResponse } from "next/server";

type params = {
  id: string;
  channel: string;
};

export async function GET(_: Request, { params }: { params: params }) {
  const { channel } = params;

  try {
    const response = await axiosClient.get(`/channels/${channel}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
