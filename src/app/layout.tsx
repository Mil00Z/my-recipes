
import type { Metadata,Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

//Styles
import "./starter.css";
import '@/styles/raw.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "My Recipes",
  description: "A Recipe Manager",
  applicationName: "My Recipes",
  keywords: ["react", "nextjs", "tailwindcss", "typescript","recipes","manager","food"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "var(--main-color)",

}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased home`}>
        {children}
      </body>
    </html>
  );
}
