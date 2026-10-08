import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Load Shedding and Power Management System",
    template: "%s | Load Shedding and Power Management System",
  },
  description:
    "Report outages, view load-shedding schedules, and buy prepaid electricity tokens online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <Providers>
        <body className="min-h-full flex flex-col">
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
