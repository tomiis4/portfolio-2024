import style from "./text.module.scss"

type P = {
    text: string
}

export default function BackgroundText(p: P) {
    return (
        <p>
            {p.text.split(' ').map((word, idx) => {
                return (
                    <span key={idx} className={word.match(/\[.+\]/) ? style.hl : ""}>
                        {word.replace(/\[(.+)\]/, '$1') + ' '}
                    </span>
                );
            })}
        </p>
    )
}
