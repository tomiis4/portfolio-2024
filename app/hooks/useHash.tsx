"use client"

import { useState, useEffect } from 'react';

export const useHash = () => {
    if (typeof window == "undefined") return ""

    const [hash, setHash] = useState(window.location.hash ?? "");
    useEffect(() => {
        const onHashChange = () => {
            setHash(window.location.hash);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);
    return hash;
};
