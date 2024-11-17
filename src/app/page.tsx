"use client";
import { FormEvent, useEffect, useState } from "react";
import { Message } from "./type";
import axios, { AxiosError } from "axios";
import Image from "next/image";

const CHANNEL_ID = "1307690396490661951";

export default function Home() {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const fetchMessages = async () => {
    const data = await getMessages();

    setMessages(data);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("file", file);

    try {
      const response = await axios.post(
        `/api/discord/channels/${CHANNEL_ID}/messages`,
        formData
      );

      console.log(response.data);

      fetchMessages();
      setFile(null);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response;
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-4">Home</h1>

      <form
        method="POST"
        className="mb-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit" className="mt-4 px-3 py-2 bg-white text-black">
          Upload image
        </button>
      </form>

      <div className="grid grid-cols-8">
        {messages && messages.length > 0 ? (
          messages.map((message) =>
            message.attachments.length > 0
              ? message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="border border-white flex justify-center">
                    <Image
                      alt={attachment.filename}
                      src={attachment.url}
                      width={300}
                      height={300}
                      className="h-[100px] w-auto m-2"
                    />
                  </div>
                ))
              : null
          )
        ) : (
          <p>Belum ada gambar yang diupload</p>
        )}
      </div>
    </div>
  );
}

const getMessages = async () => {
  try {
    const response = await axios.get(
      `/api/discord/channels/${CHANNEL_ID}/messages`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
