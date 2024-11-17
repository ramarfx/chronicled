import { axiosClient } from "@/lib/axiosClient";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    const response = await axiosClient.get(
      "/channels/1258068559603433617/messages"
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
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

    const response = await axiosClient.post(
      "/channels/1258068559603433617/messages",
      data,
      {
        headers: {
          ...data.getHeaders(),
        },
      }
    );

    console.log(response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error uploading file to Discord:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
