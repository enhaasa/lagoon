/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

export interface IUseBookings {
    content: any;
}

export default function useBookings(page: any) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;

        setContent({
            headline: fields.headline,
            baseCost: fields.baseCost,
            discordBookingLink: fields.discordBookingLink
        });

    }, [ page ]);

    return {
        content
    }
}

