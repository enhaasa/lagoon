/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentfulClient, Entry } from '@service_clients/ContentfulClient';
import { useState, useEffect, useRef } from 'react';

export interface IUseHome {
    content: any;
}

const entry = Entry.LandingPage;

export default function useHome(client: ContentfulClient) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current) return;
        
        const promises = [
            ['background', client.getImage(entry, 'background')],
        ];

        Promise.all(promises.map(p => p[1])).then((data) => {
            const result: any = {};

            promises.forEach((_, index) => {
                result[promises[index][0] as string] = data[index];
            });

            setContent(result);
            isLoaded.current = true;
        });
        
    }, [ client ]);

    return {
        content
    }
}

