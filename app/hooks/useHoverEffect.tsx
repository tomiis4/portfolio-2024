import { ReactNode, useEffect, useState } from "react";

type P = {
    children: ReactNode
}

export const UseHoverEffect = (p: P) => {
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [style, setStyle] = useState({});

    useEffect(() => {
        setStyle({
            perspective: "800px",
            transform: `rotateX(${position[1]}deg) rotateY(${position[0]}deg)`,
            transition: "transform 400ms ease-out",
            cursor: "pointer"
        });
    }, [position]);

    const handleMouse = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const x = (e.clientX - rect.left - centerX) / centerX;
        const y = (e.clientY - rect.top - centerY) / centerY;

        setPosition([x * 20, y * 20]);
    }


    const handleLeave = () => {
        setPosition([0, 0]);
    }

    return (
        //@ts-ignore
        <div 
            {...p}
            //@ts-ignore
            onMouseMove={(e) => handleMouse(e)}
            //@ts-ignore
            onTouchMove={(e) => handleMouse(e)}
            onTouchEnd={handleLeave}
            onMouseLeave={handleLeave}
            style={style}
        >
            {p.children}
        </div>
    )
};
