"use client"

import { useEffect } from "react"
import style from "./welcomeAnimation.module.scss"

export default function WelcomeAnimation() {
    useEffect(() => {
        setTimeout(() => {
            const doc = document.querySelector(`.${style.welcome}`)
            if (doc) doc.remove();
        }, 3000)
    }, [])

    return (
        <div className={style.welcome}>
            <h1> Tomáš</h1>
            <h1> Kudýnek</h1>
        </div>
    )
}
