"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./navbar.module.scss"
import { useHash } from "@/h/useHash";
import BackgroundText from "../Background/BackgroundText";

export default function Navbar() {
    const hash = useHash();
    const params = useParams();
    const listHash = ['home', 'aboutme', 'projects', 'contacts']
    const listName = ["Home", "About Me", "Projects", "Contacts"]
    const [active, setActive] = useState<string[]>([style.active, '', '', '']);
    const [visible, setVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window == "undefined" ? 0 : window.innerWidth);

    const handleNavbar = () => {
        setVisible(!visible);
    }

    useEffect(() => {
        const windowHash = window.location.hash.replace('#', '');
        let newActive = new Array(4).fill("");

        newActive[listHash.indexOf(windowHash)] = style.active
        setActive(newActive)
    }, [hash, params, setActive])

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const pc = <nav>
        {
            listName.map((val, idx) => {
                return (
                    <Link className={active[idx]} href={`?t=t#${listHash[idx]}`} >
                        {val}
                    </Link>
                )
            })
        }
    </nav>

    const phone = <>
        <div className={visible ? style.visible : ""} onClick={handleNavbar}>
            <span />
            <span />
            <span />
        </div>
        <nav className={visible ? style.visible : ""}>
            {listName.map((val, idx) => {
                return (<>
                    <Link onClick={handleNavbar} className={`${active[idx]} `} href={`?t=t#${listHash[idx]}`} >
                        {val}
                    </Link>
                </>)
            })}
        </nav>
    </>;


    return (
        <header className={style.navbar}>
            {
                windowWidth < 750 ? phone : pc
            }
        </header>
    )
}
