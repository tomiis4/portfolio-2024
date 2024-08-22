import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"
import style from "./contacts.module.scss"
import Link from "next/link"
import { UseHoverEffect } from "@/hooks/useHoverEffect"
import { useEffect, useState } from "react"

export default function Contacts() {
    const [anim, setAnim] = useState({});
    const data = [
        {
            icon: faGoogle,
            link: "mailto:tomas.kudynek@gmail.com",
            name: "tomas.kudynek@gmail.com",
            social: "Gmail"
        },
        {
            icon: faGithub,
            link: "https://github.com/tomiis4",
            name: "tomiis4",
            social: "GitHub"
        },
        {
            icon: faInstagram,
            link: "https://instagram.com/tomii6_",
            name: "tomii6_",
            social: "Instagram"
        }
    ]

    const handleCopy = (text:string) => {
        navigator.clipboard.writeText(text)

        setAnim(style.anim)
        // tady se dá to upozornění
    }

    useEffect(() =>{
        setTimeout(() => {
            setAnim("")
        }, 1000)
    }, [anim])

    return (
        <section className={style.contacts} id="contacts">
            <div className={style.wrapper}>
                {
                    data.map((social) => {
                        return (
                            <UseHoverEffect className={anim} onClick={() => handleCopy(social.name)}>
                                <FontAwesomeIcon icon={social.icon} style={{ color: "#f2f2f2" }} />
                                <h2>
                                    <Link target="_blank" href={social.link}> {social.name} </Link>
                                </h2>
                                <p> {social.social} </p>
                            </UseHoverEffect>
                        )
                    })
                }
            </div>
        </section>
    )
}

