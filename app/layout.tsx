import type { Metadata } from "next";
import { Kalam, Permanent_Marker, Rock_Salt, Slackside_One, Caveat_Brush } from "next/font/google";
import "./globals.css";
import BrushImage from "../public/images/brush-big-banner-top.png"
import Container from "./components/Container";
import Menu from "./components/Menu";
import Border from "./components/Border";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "E-Samurai",
  description: "Get the fuck up Samurai!",
};

const kalam = Kalam({
  subsets: ['latin'],
  weight: "300"
})

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: "400"
})

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: "400"
})

const slacksideOne = Slackside_One({
  subsets: ['latin'],
  weight: "400"
})

const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: "400"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${permanentMarker.className} bg-stone-400 text-stone-100 min-w-screen min-h-screen bg-[url('../public/images/samurai.png')] bg-contain bg-center bg-no-repeat`}> 
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
