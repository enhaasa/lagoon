/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export interface IUseOffCanvas {
    show: () => void;
    hide: () => void;
    setIsShown: boolean;
    content: JSX.Element | null;
    openWithContent: (T: any) => void;
}

export default function useOffCanvas() {
    const [ isShown, setIsShown ] = useState(false);
    const [ content, setContent ] = useState<JSX.Element | null>(null);

    function openWithContent(content: any) {
        setContent(content);
        show();
    }

    function show() {
        setIsShown(true);
    }

    function hide() {
        setIsShown(false);
    }

    return {
        isShown,
        show,
        hide,
        content,
        openWithContent,
    }
}

