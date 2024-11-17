import { axiosClient } from "@/lib/axiosClient";
import { AxiosError } from "axios";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

type params = {
  id: string;
};

export async function GET(_: Request, { params }: { params: params }) {
  const { id } = params;

  try {
    const response = await axiosClient.get(`/channels/${id}/messages`);

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

export async function POST(
  request: NextRequest,
  { params }: { params: params }
) {
  const { id } = params;
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const content = formData.get("content") as string | null;

  if (!file) {
    return NextResponse.json({ error: "File not provided" }, { status: 400 });
  }

  try {
    const data = new FormData();
    const buffer = Buffer.from(await file.arrayBuffer()); // Konversi file ke buffer
    data.append("file", buffer, file.name);
    data.append("content", content || "");

    const response = await axiosClient.post(`/channels/${id}/messages`, data, {
      headers: {
        ...data.getHeaders(),
      },
    });

    console.log(response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error uploading file to Discord:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
