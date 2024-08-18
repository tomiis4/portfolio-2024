"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./navbar.module.scss"
import { useHash } from "@/h/useHash";

export default function Navbar() {
    const hash = useHash();
    const params = useParams();
    const router = useRouter();
    const listHash = ['home', 'aboutme', 'projects', 'contacts']
    const [active, setActive] = useState<string[]>([style.active, '', '', '']);

    const handleClick = (idx: number) => {
        const windowHash = window.location.hash;
        router.replace(windowHash, {scroll: false})
        router.push(`#${listHash[idx]}`, {scroll: true})
    }

    useEffect(() => {
        const windowHash = window.location.hash.replace('#', '');
        let newActive = new Array(4).fill("");

        newActive[listHash.indexOf(windowHash)] = style.active
        setActive(newActive)
    }, [hash, params, setActive])

    return (
        <header className={style.navbar}>
            <nav>
                {
                    ["Home", "About Me", "Projects", "Contacts"].map((val, idx) => {
                        return (
                            <Link
                                className={active[idx]}
                                onClick={() => handleClick(idx)}
                                href={`#${listHash[idx]}`}
                                scroll={false}
                            >
                                {val}
                            </Link>
                        )
                    })
                }
            </nav>
        </header>
    )
}
