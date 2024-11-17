/* eslint-disable react/no-unescaped-entities */
"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
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
import { LoaderCircle, Plus } from "lucide-react";
import Loader from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";

const CHANNEL_ID = "1307690396490661951";

export default function Home() {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log("perubahan file", file);
    console.log("perubahan content", content);
  }, [file, content]);

  const fetchMessages = async () => {
    const data = await getMessages();

    setMessages(data);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("file", file as File);
    formData.append("content", content);

    try {
      const response = await axios.post(
        `/api/discord/channels/${CHANNEL_ID}/messages`,
        formData
      );

      console.log(response.data);

      fetchMessages();

      return toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        
        return toast({
          variant: "destructive",
          title: "Failed",
          description: error.response?.data.error.message,
        });
      } else if (error instanceof Error) {
        return toast({
          variant: "destructive",
          title: "Failed",
          description: error.message,
        });
      }else {
        return toast({
          variant: "destructive",
          title: "Failed",
          description: "Something went wrong",
        })
      }
    } finally {
      setIsLoading(false);
      setFile(null);
      setContent("");

      formData.delete("file");
      formData.delete("content");
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="text-3xl text-center mt-4 mb-10">Chronicled Gallery</h1>

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
              <DialogHeader className="mb-4">
                <DialogTitle>Upload Image</DialogTitle>
                <DialogDescription>
                  Tambahkan image baru ke gallery
                </DialogDescription>
              </DialogHeader>

              <div className="mb-3">
                <label htmlFor="content">Pesan</label>
                <Input
                  type="text"
                  name="content"
                  id="content"
                  placeholder="Pesan (opsional)"
                  value={content}
                  onChange={handleContentChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="file">Image</label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 animate-spin" />
                      Uploading
                    </>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <main>
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
                          <Suspense fallback={<p>loading...</p>}>
                            <Image
                              alt={attachment.filename}
                              src={attachment.url}
                              width={300}
                              height={300}
                              className="h-full w-auto min-w-full object-fill"
                            />
                          </Suspense>
                        </div>
                      ))
                    : null
                )
              ) : (
                <Loader />
              )}
            </div>
          </CardContent>
        </Card>
      </main>
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
    console.error("error fetching data: ", error);

    return [];
  }
};
