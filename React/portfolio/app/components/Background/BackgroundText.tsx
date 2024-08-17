import style from "./background.module.scss"
import Head from 'next/head'

type P = {
    text: string
}

//TODO
export default function BackgroundText(p: P) {
    return (
        <>
            <head>
                <title> Tomáš Kudýnek | {p.text} </title>
            </head>
            <h1 className={style.text}> {p.text} </h1>
        </>
    )
}
