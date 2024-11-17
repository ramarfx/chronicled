import { axiosClient } from "@/lib/axiosClient";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

type params = {
  id: string;
};

export async function GET(_: Request, { params }: { params: params }) {
  const { id } = params;

  try {
    const response = await axiosClient.get(`/channels/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    } else if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    } else {
      return NextResponse.json({ error: "unknown error" }, { status: 500 });
    }
  }
}
