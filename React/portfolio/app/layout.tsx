import type { Metadata } from "next";
import { anton, hind } from "@/fonts";

import "@/s/globals.scss"
import Navbar from '@/c/Nav/Navbar'
import WelcomeAnimation from "./components/WelcomeAnimation/WelcomeAnimation";


export const metadata: Metadata = {
    title: "Tomáš Kudýnek | Home",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${anton.variable} ${hind.variable}`}>
            <body>
                <Navbar />
                <main> {children} </main>
                {/* <WelcomeAnimation /> */}
            </body>
        </html>
    );
}
