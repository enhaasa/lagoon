/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export interface IUseOffCanvas {
    show: () => void;
    hide: () => void;
    isShow: boolean;
    content: JSX.Element | null;
    openWithContent: (T: any) => void;
}

export default function useOffCanvas() {
    const [ isShow, setIsShow ] = useState<boolean>(false);
    const [ content, setContent ] = useState<JSX.Element | null>(null);

    function openWithContent(content: any) {
        setContent(content);
        show();
    }

    function show() {
        setIsShow(true);
    }

    function hide() {
        setIsShow(false);
    }

    return {
        isShow: isShow,
        show,
        hide,
        content,
        openWithContent
    }
}

