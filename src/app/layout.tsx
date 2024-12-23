import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FileText, Library, Mic } from "lucide-react";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Audio Processor",
  description: "Generate audio from text using OpenAI's GPT-4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  href="/"
                  className="flex items-center px-4 text-gray-900 font-semibold"
                >
                  <Mic className="w-6 h-6 mr-2" />
                  AI Audio Processor
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/library"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  <Library className="w-5 h-5 mr-1" />
                  Library
                </Link>
                <Link
                  href="/existing"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  <FileText className="w-5 h-5 mr-1" />
                  Existing Document
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
