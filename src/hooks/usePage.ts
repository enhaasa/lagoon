import { useState } from 'react';

export interface IUsePage {
    show: () => void;
    hide: () => void;
    isShow: boolean;
}

export default function usePage() {
    const [ isShow, setIsShow ] = useState<boolean>(true);

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
    }
}

