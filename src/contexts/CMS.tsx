/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';

// Clients
import { ContentfulClient } from '@service_clients/ContentfulClient';

// Hooks
import useHome, { IUseHome } from '@hooks/cms/useHome';
import useVenue, { IUseVenue } from '@hooks/cms/useVenue';

export interface ICMSContext {
    home: IUseHome;
    venue: IUseVenue;
    components: any;
    assets: any;
}

const CMSContext = createContext<ICMSContext>({} as ICMSContext);
const client = new ContentfulClient();

const pagesToFetch: any = {
    landingPage: '2JVjG5yd2SmmYD7hfz1nQX',
    venuePage: '4V4xAQS5MnjbhkOkwk6HBv'
};

function CMSContextProvider({ children }: any) {
    const [ assets, setAssets ] = useState(null);
    const [ components, setComponents ] = useState(null);
    const [ pages, setPages ] = useState(_copyNullValuedObject(pagesToFetch));

    useEffect(() => {
        client.getEntries().then(result => {
            const newAssets: any = {};
            const newComponents: any = {};
            const newPages: any = {};

            result.includes.Asset.forEach((asset: any) => (
                newAssets[asset.sys.id] = { 
                    ...asset.fields, 
                    file: { ...asset.fields.file, url: `https:${asset.fields.file.url}` } 
                }
            ));
            
            Object.keys(pagesToFetch).forEach(page => {
                const resultEntryIndex = result.items.findIndex((entry: any) => 
                    (entry.sys.id === pagesToFetch[page]));

                newPages[page] = result.items[resultEntryIndex];
                delete result.items[resultEntryIndex];
            });

            // Remaining results after deleting the page matches
            result.items.forEach((item: any) => {
                if (item) {
                    newComponents[item.sys.id] = item.fields;
                }
            });

            setAssets(newAssets);
            setComponents(newComponents);
            setPages(newPages);
        });
    }, []);

    const home = useHome(pages.landingPage, assets);
    const venue = useVenue(pages.venuePage, assets, components);

    return (
        <CMSContext.Provider value={{
            assets: assets,
            components,
            home,
            venue
        }}>
            {children}
        </CMSContext.Provider>
    )
}

function _copyNullValuedObject(obj: any) {
    const newObj: any = {};
    Object.keys(obj).forEach((key: string) => newObj[key] = null);

    return newObj;
}

export { CMSContextProvider, CMSContext };