import Image from "next/image";
import style from "./projects.module.scss";
import Link from "next/link";

export default function Projects() {
    const projects = [{
        title: "Hypersonic.nvim",
        language: "Lua",
        year: "2023",
        link: ["https://github.com", "GitHub"],
        text: "A powerful [NeoVim] plugin created to [increase] our regular expression ([RegExp]) writing and testing [experience]. Whether you're a [newbie] or [professional] developer, Hypersonic is here to make your life easier and [boost] your [productivity].",
        image: "https://github-production-user-asset-6210df.s3.amazonaws.com/87276646/356874661-7b99cc86-ca37-40ff-af6b-e1e80e1622d3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240815%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240815T205224Z&X-Amz-Expires=300&X-Amz-Signature=d7900e7736125a6efb581b731582ac0cc142ad072ae82f1e5b8ea0bfa05071e6&X-Amz-SignedHeaders=host&actor_id=87276646&key_id=0&repo_id=593284732"
    }]
    // <Image src={"https://github.com/user-attachments/assets/7b99cc86-ca37-40ff-af6b-e1e80e1622d3"} width={500} height={200}  alt={"img"} />
    //
    // <h2>Hypersonic.nvim</h2>
    // <h4>
    //     Lua <span> | </span> 2023 <span> | </span> <Link href="#"> GitHub </Link>
    // </h4>
    // <p>
    //
    // </p>
    return (
        <section id="projects" className={style.projects}>
            <div>
                {
                    projects.map((project) => {
                        return (<>
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
                            <Image
                                src={project.image}
                                alt={"image"}
                                fill

                            />
                        </>)
                    })
                }
            </div>
        </section>
    )
}

