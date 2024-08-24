import style from "./background.module.scss"

type P = {
    text: string
}

export default function BackgroundText(p: P) {
    return (
        <>
            <h1 className={style.text}> {p.text} </h1>
        </>
    )
}
