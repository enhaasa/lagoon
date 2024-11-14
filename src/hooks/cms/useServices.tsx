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
        
        const parsedIncludedServices = [ ...fields.includedServices ?? [] ];
        const parsedPaidServices = [ ...fields.paidServices ?? [] ]; 

        parsedIncludedServices?.forEach((service: any, index: number) => {

            const backgroundId = components[service.sys.id]?.background?.sys?.id;

            parsedIncludedServices[index] = {
                ...components[service.sys.id],
                background: assets[backgroundId]?.file.url
            };
        });

        parsedPaidServices?.forEach((service: any, index: number) => {

            const backgroundId = components[service.sys.id]?.background?.sys?.id;

            parsedPaidServices[index] = {
                ...components[service.sys.id],
                background: assets[backgroundId]?.file.url
            };
        });

        setContent({
            headline: fields.headline,
            includedServices: parsedIncludedServices,
            paidServices: parsedPaidServices
        });

    }, [ page, assets, components ]);

    return {
        content
    }
}

