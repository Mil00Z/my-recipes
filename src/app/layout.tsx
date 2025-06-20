
import type { Metadata,Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

//Layouts
import Footer from "@/components/Footer/Footer";

//Styles
import "@/styles/main.scss";
import "@/styles/raw.css";


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
      <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          
            {children}

            <Footer />
      </body>
    </html>
  );
}
