import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TodoStoreProvider } from "@/store/todo-store-providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "To Do App ",
  description: "This is a hands on task from Nasheedio for frontend role",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TodoStoreProvider>{children}</TodoStoreProvider>
      </body>
    </html>
  );
}
