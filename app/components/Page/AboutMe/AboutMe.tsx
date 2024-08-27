import { useRef } from "react";
import style from "./aboutme.module.scss";
import Text from '@/c/Text/Text';

export default function AboutMe() {
    const ref = useRef<HTMLDivElement>(null);
    const text = [
        "My name is [Tomáš] [Kudýnek], and I live in the [Czech] [Republic]. I specialize in [backend] [development], though I also have solid experience in [frontend] [technologies].",
        "Over the past [3] [years], I've been working extensively with [JavaScript], [TypeScript], [React], and [Node.js], building dynamic and responsive applications.",
        "In addition, I have [2] [years] of experience with [GoLang] and [Lua], which has allowed me to work on a variety of projects with different architectures and complexities."
    ]

    return (
        <section className={style.aboutme} id="aboutme">
            <div ref={ref}>
                {text.map((row) => {
                    return (
                        <Text text={row} />
                    )
                })}
            </div>
        </section>
    )
}
