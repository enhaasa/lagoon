/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

export interface IUseMenu {
    content: any;
}

export default function useMenu(page: any, assets: any) {
    const [ content, setContent ] = useState<null | any>(null);
    const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;

        setContent({
            headline: fields.headline,
            subline: fields.subline,
            background: assets[fields?.background?.sys?.id]?.file?.url ?? '',
        });
    }, [ page ]);

    return {
        content
    }
}

