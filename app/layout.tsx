import type { Metadata } from "next";
import { Kalam, Permanent_Marker, Rock_Salt, Slackside_One, Caveat_Brush, Righteous } from "next/font/google";
import "./globals.css";
import BrushImage from "../public/images/brush-big-banner-top.png"
import Container from "./components/Container";
import Menu from "./components/Menu";
import Border from "./components/Border";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Image from "next/image";
import Session from "./components/Session";
import { getCurrentAccount, getCurrentUser, getServers } from "./api/helpers/utils";
import SignIn from "./components/SignIn";
import { SocketProvider } from "./components/SocketProvider";
import { QueryProvider } from "./components/QueryProvider";

export const metadata: Metadata = {
  title: "E-Samurai",
  description: "Get the fuck up Samurai!",
};

const kalam = Kalam({
  subsets: ['latin'],
  weight: "300"
})

const righteous = Righteous({
  subsets: ['latin'],
  weight: "400"
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

export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const currentUser = await getCurrentUser()
  const currentAccount = await getCurrentAccount()
  
  if(!currentUser){
    return (
      <html lang="en">
      <body className={`${permanentMarker.className} bg-stone-400 text-stone-100 w-screen h-screen`}>
        <div className={`absolute z-10 bg-stone-400 text-stone-100 w-screen h-screen bg-[url('../public/images/samurai.png')] bg-contain bg-center bg-no-repeat blur-[4px]`}/> 
        <div className="relative z-20 w-screen h-screen">
          <Session>
            <SignIn currentUser={null}/>
          </Session>
        </div>
      </body>
    </html>
    )
  }
  
  if(currentAccount){
    const servers = await getServers(currentAccount.userId);
    return (
      <html lang="en">
        <body className={`${permanentMarker.className} bg-stone-400 text-stone-100 w-screen h-screen`}>
          <div className={`absolute z-10 bg-stone-400 text-stone-100 w-screen h-screen bg-[url('../public/images/samurai.png')] bg-contain bg-center bg-no-repeat blur-[4px]`}/> 
          <div className="relative z-20 w-screen h-screen flex">
            <Session>
              <SocketProvider>
                <QueryProvider>
                  <Menu servers={servers} account={currentAccount}/>
                  {children}
                </QueryProvider>
              </SocketProvider>
            </Session>
          </div>
        </body>
      </html>
    );
  }
}
