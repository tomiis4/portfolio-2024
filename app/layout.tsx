import type { Metadata } from "next";
import { anton, hind } from "@/fonts";

import "@/s/globals.scss"
import Navbar from '@/c/Nav/Navbar'
import WelcomeAnimation from "./components/WelcomeAnimation/WelcomeAnimation";


export const metadata: Metadata = {
    title: "Tomáš Kudýnek | Portfolio",
    description: "A back-end focused developer based in the Czech Republic with expertise in GoLang, TypeScript, and ReactJs. Explore my portfolio to see my projects or contact me for collaboration opportunities."
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${anton.variable} ${hind.variable}`}>
            <body>
                <WelcomeAnimation />
                <Navbar />
                <main> {children} </main>
            </body>
        </html>
    );
}
