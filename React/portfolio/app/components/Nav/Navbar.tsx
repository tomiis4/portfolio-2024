import Link from "next/link";
import style from "./navbar.module.scss"

export default function Navbar() {
    return (
        <header className={style.navbar}>
            <nav>
                <Link href={"#"}>Home</Link>
                <Link href={"#"}>About Me</Link>
                <Link href={"#"}>Projects</Link>
                <Link href={"#"}>Contacts</Link>
            </nav>
        </header>
    )
}
