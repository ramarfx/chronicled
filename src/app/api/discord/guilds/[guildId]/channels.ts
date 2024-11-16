import { axiosClient } from "@/libs/axiosClient";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { guildId } = req.query;

  if (!guildId || typeof guildId !== "string") {
    return res
      .status(400)
      .json({ message: "guildId is required and must be a string" });
  }

  try {
    const response = await axiosClient.get(
      `/users/@me/guilds/${guildId}/channels`
    );

    return res.json(response.data);
  } catch (error) {
    console.error(error);

    return res.json(error);
  }
}
