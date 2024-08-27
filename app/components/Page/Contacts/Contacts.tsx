import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"
import style from "./contacts.module.scss"
import Link from "next/link"
import { UseHoverEffect } from "@/hooks/useHoverEffect"
import { useEffect, useState } from "react"

export default function Contacts() {
    const [anim, setAnim] = useState<string[]>(['', '', '']);
    let data = [
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

    const handleCopy = (text: string, idx: number) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
        }

        let newAnim = new Array(3).fill('');
        newAnim[idx] = style.anim;

        setAnim(newAnim)
    }

    useEffect(() => {
        setTimeout(() => {
            if (anim.includes(style.anim)) {
                setAnim(['', '', ''])
            }
        }, 1000)
    }, [anim])

    return (
        <section className={style.contacts} id="contacts">
            <div className={style.wrapper}>
                {
                    data.map((social, idx) => {
                        return (
                            <UseHoverEffect className={anim[idx]} onClick={() => handleCopy(social.link, idx)}>
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

