/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export interface IUseOffCanvas {
    show: () => void;
    hide: () => void;
    isShown: boolean;
    content: JSX.Element | null;
    openWithContent: (T: any) => void;
}

export default function useOffCanvas() {
    const [ isShown, setIsShown ] = useState(false);
    const [ content, setContent ] = useState<JSX.Element | null>(null);

    console.log('content', content)

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

