/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Message } from "./type";
import axios from "axios";
import Image from "next/image";

const getMessages = async () => {
  try {
    const response = await axios.get("/api/discord/messages");

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default function Home() {
  const [messages, setMessages] = useState([] as Message[]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages();

      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center mt-4">Home</h1>

      <div className="grid grid-cols-8">
        {messages.map((message) => {
          return message.attachments.map((attachment) => (
            <img
              alt={attachment.filename}
              key={attachment.id}
              src={attachment.url}
              className="h-[100px] w-auto m-2"
            />
          ));
        })}
      </div>
    </div>
  );
}
