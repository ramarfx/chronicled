import { axiosClient } from "@/libs/axiosClient";
import axios from "axios";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const response = await axiosClient.get(
        "/channels/1146739358532108291/messages"
      );

      return NextResponse.json(response.data);
    } catch (error) {
      console.error(error);

      return NextResponse.json(error);
    }
  } else if (req.method == "POST") {
    return NextResponse.json({ message: "hello world" });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File not provided" }, { status: 400 });
  }

  try {
    const data = new FormData();
    const buffer = Buffer.from(await file.arrayBuffer()); // Konversi file ke buffer
    data.append("file", buffer, file.name);

    const response = await axios.post(
      "https://discord.com/api/v10/channels/1146739358532108291/messages",
      data,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          ...data.getHeaders(),
        },
        maxBodyLength: Infinity,
      }
    );

    console.log(response.data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error uploading file to Discord:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
