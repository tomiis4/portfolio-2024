"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./navbar.module.scss"
import { useHash } from "@/u/useHash";

export default function Navbar() {
    const hash = useHash();
    const navIndex = ['home', 'aboutme', 'projects', 'contacts']
    const params = useParams();
    const [active, setActive] = useState([style.active, '', '', '']);

    useEffect(() => {
        let newActive = new Array(4).fill("");
        const updatedHash = window.location.hash.replace('#', '');

        newActive[navIndex.indexOf(updatedHash)] = style.active
        setActive(newActive)
    }, [hash, params, setActive])

    return (
        <header className={style.navbar}>
            <nav>
                <Link className={active[0]} href={"#home"}>Home</Link>
                <Link className={active[1]} href={"#aboutme"}>About Me</Link>
                <Link className={active[2]} href={"#projects"}>Projects</Link>
                <Link className={active[3]} href={"#contacts"}>Contacts</Link>
            </nav>
        </header>
    )
}
