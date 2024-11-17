/* eslint-disable react/no-unescaped-entities */
"use client";
import { FormEvent, useEffect, useState } from "react";
import { Message } from "./type";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const CHANNEL_ID = "1307690396490661951";

export default function Home() {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
 
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
    <div className="container">
      <h1 className="text-3xl text-center mt-4 mb-10">Ramarfx's Gallery</h1>

      <Dialog>
        <DialogTrigger asChild className="flex justify-end">
          <div className="flex justify-end">
            <Button>
              <Plus />
              Upload Image
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <form
            method="POST"
            className=""
            onSubmit={handleSubmit}
            encType="multipart/form-data">
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Tambahkan image baru ke gallery
              </DialogDescription>
            </DialogHeader>
            <label htmlFor="file">File</label>
            <Input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <DialogFooter className="mt-4">
              <Button type="submit">Upload image</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="w-full min-h-[70dvh] h-max py-4 mt-4">
        <CardContent>
          <div className="flex flex-wrap">
            {messages && messages.length > 0 ? (
              messages.map((message) =>
                message.attachments.length > 0
                  ? message.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="h-[150px] border p-1 flex justify-center">
                        <Image
                          alt={attachment.filename}
                          src={attachment.url}
                          width={300}
                          height={300}
                          className="h-full w-auto min-w-full object-fill"
                        />
                      </div>
                    ))
                  : null
              )
            ) : (
              <p>Belum ada gambar yang diupload</p>
            )}
          </div>
        </CardContent>
      </Card>
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
