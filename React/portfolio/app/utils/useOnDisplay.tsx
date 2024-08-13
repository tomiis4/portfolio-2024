import { useEffect, useState, useRef, RefObject } from 'react';

export default function useOnDisplay(ref: RefObject<HTMLElement>) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0.50 });
    }, []);

    useEffect(() => {
        observerRef.current!.observe(ref.current!);

        return () => {
            observerRef.current!.disconnect();
        };
    }, [ref]);

    return isVisible;
}
