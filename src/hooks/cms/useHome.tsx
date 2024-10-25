/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentfulClient, Entry } from '@service_clients/ContentfulClient';
import { useState, useEffect, useRef } from 'react';

// Utils
import { promisesToObject } from '@utils/promises';

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
            ['heroWords', client.getFieldArray(entry, 'heroWords')]
        ];

        promisesToObject(promises).then(result => {
            setContent(result);
            isLoaded.current = true;
        })
    }, [ client ]);

    return {
        content
    }
}

