import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {TooltipProvider} from '@/components/ui/tooltip'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WishAura",
  description: "A birthday wishes for your family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Providers>
            <Navbar />

            {/* Layout padding so fixed header/footer never overlap content */}
            <div className="pt-20 pb-16 flex-1 w-full">{children}</div>

            <Footer />
          </Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}

