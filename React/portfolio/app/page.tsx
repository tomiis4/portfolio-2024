"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import useOnDisplay from '@/u/useOnDisplay';
import BackgroundText from '@/c/Background/BackgroundText';

import Home from "@/c/Page/Home/Home";
import AboutMe from "@/c/Page/AboutMe/AboutMe";
import Projects from "@/c/Page/Projects/Projects";
import Contacts from "@/c/Page/Contacts/Contacts";

// TODO:
// když začne vidět text/kartičky tak se změní hash na tu na které to má být a scrollne to (:

export default function Page() {
    const params = useSearchParams();
    const hash = window.location.hash.replace('#', '')
    const router = useRouter();
    const pathname = usePathname();

    const refs = {
        home: useRef<HTMLDivElement>(null),
        aboutme: useRef<HTMLDivElement>(null),
        projects: useRef<HTMLDivElement>(null),
        contacts: useRef<HTMLDivElement>(null),
    }
    const isVisible = {
        home: useOnDisplay(refs.home),
        aboutme: useOnDisplay(refs.aboutme),
        projects: useOnDisplay(refs.projects),
        contacts: useOnDisplay(refs.contacts),
    }
    const [bgText, setBgText] = useState("Welcome");

    // jsem na X, param je T, a linkuji se na Z
    // scrolluji dolů, jsem na Y, ale nejdu tam, protože param je T
    // jsem na Z, linknu tam, protože jsem linkoval na Z a param měním na F

    useEffect(() => {
        for (const [key, value] of Object.entries(isVisible)) {
            if (value) {
                router.push(`#${key}`, { scroll: false });

                switch (key) {
                    case "home": setBgText("Welcome"); break;
                    case "aboutme": setBgText("About Me"); break;
                    case "projects": setBgText("Projects"); break;
                    case "contacts": setBgText("Contacts"); break;
                }
            }
        }
    }, [isVisible])

    return (
        <>
            <div ref={refs.home}><Home /></div>
            <div ref={refs.aboutme}><AboutMe /></div>
            <div ref={refs.projects}><Projects /></div>
            <div ref={refs.contacts}><Contacts /></div>

            <BackgroundText text={bgText} />
        </>
    )
}
