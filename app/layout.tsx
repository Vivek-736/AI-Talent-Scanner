import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import { VapiProvider } from "@/context/VapiContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talq - Your AI for hiring",
  description:
    "An AI powered platform where you can create interviews and hire",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Provider>
          <VapiProvider>{children}</VapiProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}