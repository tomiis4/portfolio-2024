// TODO
// [0]: responzivita
// [1]: dynamický title
// [2]: favicon
// [3]: description
// [4]: přidat projekty
// [5]: README

"use client"

import { useRouter } from "next/navigation";
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useOnDisplay from '@/h/useOnDisplay';
import BackgroundText from '@/c/Background/BackgroundText';

import Home from "@/c/Page/Home/Home";
import AboutMe from "@/c/Page/AboutMe/AboutMe";
import Projects from "@/c/Page/Projects/Projects";
import Contacts from "@/c/Page/Contacts/Contacts";

type Refs = { [key: string]: MutableRefObject<any> }
type Visible = { [key: string]: boolean }

export default function Page() {
    const router = useRouter();
    const [bgText, setBgText] = useState<string>("Welcome");

    const refs: Refs = {
        home: useRef<HTMLDivElement>(null),
        aboutme: useRef<HTMLDivElement>(null),
        projects: useRef<HTMLDivElement>(null),
        contacts: useRef<HTMLDivElement>(null),
    }
    const isVisible: Visible = {
        home: useOnDisplay(refs.home),
        aboutme: useOnDisplay(refs.aboutme),
        projects: useOnDisplay(refs.projects),
        contacts: useOnDisplay(refs.contacts),
    }

    useEffect(() => {
        const hash = window.location.hash.replace("#", "")
        const isParam = window.location.search == "?t=t"

        for (const [key, value] of Object.entries(isVisible)) {
            if (value) {
                if (key != hash) {
                    // FIXME
                    // window.location.hash = `#${key}`
                    if (!isParam) {
                        document.getElementById(key)!.scrollIntoView(true);
                    }
                    // if (!isParam) router.push(`#${key}`, { scroll: true }); console.log("Should scroll");
                    if (isParam) router.push(`#${key}`, { scroll: false });
                }

                if (isParam) {
                    const url = new URL(window.location.href);
                    url.searchParams.delete("t");
                    window.history.replaceState({}, '', url.toString());
                }


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
        <div >
            <div ref={refs.home}><Home /></div>
            <div ref={refs.aboutme}><AboutMe /></div>
            <div ref={refs.projects}><Projects /></div>
            <div ref={refs.contacts}><Contacts /></div>

            <BackgroundText text={bgText} />
        </div>
    )
}
