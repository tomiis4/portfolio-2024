import { RefObject } from "react"
import style from "./home.module.scss"

type P = {ref: RefObject<HTMLElement>}

export default function Home(p: P) {
    return (
        <section className={style.home} ref={p.ref}>
            <h1> Welcome! </h1>
        </section>
    )
}

