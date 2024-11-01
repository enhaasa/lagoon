/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

export interface IUseHome {
    content: any;
}

export default function useHome(page: any, assets: any) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;

        setContent({
            background: assets[fields.background.sys.id].file.url,
            heroWords: fields.heroWords
        });

    }, [ page, assets ]);

    return {
        content
    }
}

