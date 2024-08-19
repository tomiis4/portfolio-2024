import style from "./background.module.scss"
// import Head from 'next/head'

type P = {
    text: string
}

//TODO
            // <Head>
            //     <title> Tomáš Kudýnek | {p.text} </title>
            // </Head>
export default function BackgroundText(p: P) {
    return (
        <>
            <h1 className={style.text}> {p.text} </h1>
        </>
    )
}
