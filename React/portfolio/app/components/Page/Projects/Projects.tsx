import Image from "next/image";
import style from "./projects.module.scss";
import Link from "next/link";
import { useRef, useState } from "react";
import useOnDisplay from "@/h/useOnDisplay";
import Text from "@/c/Text/Text";

// TODO: add projects

type Project = {
    title: string
    language: string
    year: `${number}`
    link: string[]
    text: string
    image: string
}

export default function Projects() {
    const [activeID, setActiveID] = useState<number>(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const projects: Project[] = [{
        title: "Hypersonic.nvim",
        language: "Lua",
        year: "2023",
        link: ["https://github.com", "GitHub"],
        text: "A powerful [NeoVim] plugin created to [increase] our regular expression ([RegExp]) writing and testing [experience]. Whether you're a [newbie] or [professional] developer, Hypersonic is here to make your life easier and [boost] your [productivity].",
        image: "/projects/hypersonic.png"
    }, {
        title: "X",
        language: "Lua",
        year: "2023",
        link: ["https://github.com", "GitHub"],
        text: "A powerful [NeoVim] plugin created to [increase] our regular expression ([RegExp]) writing and testing [experience]. Whether you're a [newbie] or [professional] developer, Hypersonic is here to make your life easier and [boost] your [productivity].",
        image: "/projects/hypersonic.png"
    }, {
        title: "Y",
        language: "Lua",
        year: "2023",
        link: ["https://github.com", "GitHub"],
        text: "A powerful [NeoVim] plugin created to [increase] our regular expression ([RegExp]) writing and testing [experience]. Whether you're a [newbie] or [professional] developer, Hypersonic is here to make your life easier and [boost] your [productivity].",
        image: "/projects/hypersonic.png"
    }];

    const projectsRef = projects.map(() => useRef<HTMLDivElement>(null));
    const visibleProjects = projectsRef.map((ref) => useOnDisplay(ref))


    const handleScroll = () => {
        let value = activeID;
        visibleProjects.forEach((project, idx) => {
            if (project == true && value != idx) {
                value = idx
            }
        })
        setActiveID(value)
        scrollTo(value)
    };

    const moveSide = (side: "left" | "right") => {
        let value = activeID;
        if (side == "left") {
            value = activeID - 1 == -1 ? projects.length - 1 : activeID - 1
        } else if (side == "right") {
            value = (activeID + 1) % projects.length
        }

        setActiveID(value)
        scrollTo(value)
    }

    const scrollTo = (id: number) => {
        //@ts-ignore
        const width = wrapperRef!.current!.scrollLeftMax / (projects.length - 1)

        setActiveID(id)
        wrapperRef!.current!.scrollLeft = id * width
    }

    return (
        <section id="projects" className={style.projects}>
            <div className={style.box}>
                <div className={style.wrapper} onWheel={handleScroll} onTouchMove={handleScroll} ref={wrapperRef}>
                    {
                        projects.map((project, idx) => {
                            return (
                                <div className={style.card} ref={projectsRef[idx]} key={idx}>
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
                                    <Text text={project.text} />
                                </div>)
                        })
                    }
                </div>
                <div className={style.switch}>
                    <button type="button" onClick={() => moveSide("left")}> &lt; </button>
                    {
                        projects.map((_, i) => {
                            return (
                                <span
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    className={i == activeID ? style.hl_bg : ''}
                                />
                            )
                        })
                    }
                    <button type="button" onClick={() => moveSide("right")}> &gt; </button>
                </div>
            </div>
        </section>
    )
}
