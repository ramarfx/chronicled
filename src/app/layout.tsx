import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Github, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}

        <footer className="mx-auto flex items-center justify-center gap-8 my-8 max-w-screen-sm w-full">
          <a
            href="https://github.com/ramarfx"
            className="flex gap-2 items-center hover:underline-offset-2 hover:underline">
            <Github className="size-[18px]" />
            <p>@ramarfx</p>
          </a>
          <p className="hidden md:block">Ramarfx 2024</p>
          <a
            href="https://instagram.com/ramtxh"
            className="flex gap-2 items-center hover:underline-offset-2 hover:underline">
            <Instagram className="size-[18px]" />
            <p>@ramtxh</p>
          </a>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
