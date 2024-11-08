/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

export interface IUseServices {
    content: any;
}

export default function useServices(page: any, assets: any, components: any) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;
        const parsedServices = [ ...fields.services ];

        parsedServices.forEach((service: any, index: number) => {

            parsedServices[index] = {
                ...components[service.sys.id],
                imageGallery: components[service.sys.id].imageGallery.map((image: any) => (
                    assets[image.sys.id]
                )) 
            };
        });

        setContent({
            headline: fields.headline,
            services: parsedServices
        });

    }, [ page, assets, components ]);

    return {
        content
    }
}

