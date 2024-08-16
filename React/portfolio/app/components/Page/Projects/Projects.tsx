import Image from "next/image";
import style from "./projects.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function Projects() {
    const [activeID, setActiveID] = useState(0);
    const projects = [{
        title: "Hypersonic.nvim",
        language: "Lua",
        year: "2023",
        link: ["https://github.com", "GitHub"],
        text: "A powerful [NeoVim] plugin created to [increase] our regular expression ([RegExp]) writing and testing [experience]. Whether you're a [newbie] or [professional] developer, Hypersonic is here to make your life easier and [boost] your [productivity].",
        image: "/projects/hypersonic.png"
    },{
        title: "Hypersonic.nvim",
        language: "Lua",
        year: "2023",
        link: ["https://github.com", "GitHub"],
        text: "A powerful [NeoVim] plugin created to [increase] our regular expression ([RegExp]) writing and testing [experience]. Whether you're a [newbie] or [professional] developer, Hypersonic is here to make your life easier and [boost] your [productivity].",
        image: "/projects/hypersonic.png"
    }]

    return (
        <section id="projects" className={style.projects}>
            <div className={style.box}>
                {
                    projects.map((project) => {
                        return (
                            <div className={style.card}>
                                <Image
                                    src={project.image}
                                    alt={"image"}
                                    fill
                                />
                                <h1>{project.title}</h1>
                                <h4>
                                    {project.language}
                                    <span className={style.hl}> | </span>
                                    {project.year}
                                    <span className={style.hl}> | </span>
                                    <Link href={project.link[0]}> {project.link[1]} </Link>
                                </h4>
                                <p>
                                    {
                                        project.text.split(' ').map((word, i) => {
                                            return (
                                                <span key={i} className={word.match(/\[.+\]/) ? style.hl : ""}>
                                                    {word.replace(/\[(.+)\]/, '$1') + ' '}
                                                </span>
                                            );
                                        })
                                    }
                                </p>
                            </div>)
                    })
                }
                <div className={style.switch}>
                    <button type="button"> &lt; </button>
                    {
                        projects.map((_, i) => {
                            return (
                                <span key={i} className={i == activeID ? style.hl_bg : ''} />
                            )
                        })
                    }
                    <button type="button"> &gt; </button>
                </div>
            </div>
        </section>
    )
}

