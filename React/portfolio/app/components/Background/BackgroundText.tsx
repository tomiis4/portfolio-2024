import style from "./background.module.scss"
import { useEffect, useState } from 'react';

type P = {
    text: string
}

export default function BackgroundText(p: P) {
    const [text, setText] = useState('');
    const [old, setOld] = useState('');
    const [textStyle, setTextStyle] = useState(style.text);
    const [oldStyle, setOldStyle] = useState(style.text);

    useEffect(() => {
        if (text == '') {
            setText(p.text)
        } else if (text != p.text) {
            setOld(text)
            setText(p.text)
            setTextStyle(`${style.text} ${style.show_anim}`)
            setOldStyle(`${style.text} ${style.hide_anim}`)
            setTimeout(() => {
                setTextStyle(`${style.text} ${style.h}`)
                setOldStyle(`${style.text}`)
            }, 1000)
        }
    }, [p, text, old, textStyle, oldStyle])

// opacity: 0; transition: opacity 1000ms;
    return (
        <>
            <h1 className={textStyle}> {text} </h1>
            <h1 className={oldStyle}> {old} </h1>
        </>
    )
}
