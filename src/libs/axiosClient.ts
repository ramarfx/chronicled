import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.DISCORD_API_URL,
  headers: {
    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
  },
});
