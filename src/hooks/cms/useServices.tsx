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
            const component = components[service.sys.id];

            if (!component) return;

            const price = components[component.price.sys.id]
            const backgroundId = component?.background?.sys?.id;

            parsedPaidServices[index] = {
                ...component,
                background: assets[backgroundId]?.file.url,
                price
            };
        });

        setContent({
            headline: fields.headline,
            subline: fields?.subline,
            includedServices: parsedIncludedServices,
            paidServices: parsedPaidServices
        });

    }, [ page, assets, components ]);

    return {
        content
    }
}

