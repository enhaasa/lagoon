/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

export interface IUseVenue {
    content: any;
}

export default function useVenue(page: any, assets: any, components: any) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page) return;

        const { fields } = page;
        const parsedHighlights = [ ...fields.highlights ];

        parsedHighlights.forEach((highlight: any, index: number) => {
            parsedHighlights[index] = {
                ...components[highlight.sys.id],
                imageGallery: components[highlight.sys.id].imageGallery.map((image: any) => (
                    assets[image.sys.id]
                ))
            };
        });

        setContent({
            headline: fields.headline,
            highlights: parsedHighlights
        });
        
    }, [ page, assets, components ]);

    return {
        content
    }
}

