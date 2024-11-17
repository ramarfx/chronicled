import axios from "axios";

export const axiosClient = axios.create({
  ...axios.defaults,
  baseURL: "https://discord.com/api/v10",
  headers: {

    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    maxBodyLength: Infinity,
  },
});
