import type { Metadata } from "next";
import { anton, hind } from "@/fonts";
import ogImage from "./opengraph-image.png";

import "@/s/globals.scss"
import Navbar from '@/c/Nav/Navbar'
import WelcomeAnimation from "./components/WelcomeAnimation/WelcomeAnimation";


export const metadata: Metadata = {
    metadataBase: new URL('https://tomaskudynek.eu'),
    title: "Tomáš Kudýnek | Portfolio",
    description: "A back-end focused developer based in the Czech Republic with expertise in GoLang, TypeScript, and ReactJs. Explore my portfolio to see my projects or contact me for collaboration opportunities.",
    openGraph: {
        description: "A back-end focused developer based in the Czech Republic. Explore my portfolio to see my projects or contact me for collaboration opportunities.",
        images: [
            {
                url: ogImage.src,
                width: ogImage.width,
                height: ogImage.height
            },
        ],
    },
    twitter: {
        images: [
            {
                url: ogImage.src,
                width: ogImage.width,
                height: ogImage.height
            },
        ]
    },
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
