import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinic OS | Intelligence HUD",
  description: "Self-Scaling Medical AI Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-screen w-screen flex bg-[#5C1A1A] text-[#F5F0E8]`}>
        {children}
      </body>
    </html>
  );
}
