/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';

// Clients
import { ContentfulClient } from '@service_clients/ContentfulClient';

// Hooks
import useHome, { IUseHome } from '@hooks/cms/useHome';
import useVenue, { IUseVenue } from '@hooks/cms/useVenue';
import useServices, { IUseServices } from '@hooks/cms/useServices';
import useBookings, { IUseBookings } from '@hooks/cms/useBookings';
import useMenu, { IUseMenu } from '@hooks/cms/useMenu';

export interface ICMSContext {
    home: IUseHome;
    venue: IUseVenue;
    services: IUseServices;
    bookings: IUseBookings;
    menu: IUseMenu;
    components: any;
    assets: any;
}

const CMSContext = createContext<ICMSContext>({} as ICMSContext);
const client = new ContentfulClient();

const pagesToFetch: any = {
    landingPage: '2JVjG5yd2SmmYD7hfz1nQX',
    venuePage: '4V4xAQS5MnjbhkOkwk6HBv',
    servicesPage: 'gASSFvwM4G8UcYSFEMXZg',
    bookingsPage: '5K4VWVjFZ7xB8qDLrHIDki',
    menuPage: '4SG12btygmP3HYE0G5IRi0'
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

                const resultEntryIndex = result.items.filter((entry: any) => entry).findIndex((entry: any) => 
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
    const services = useServices(pages.servicesPage, assets, components);
    const bookings = useBookings(pages.bookingsPage);
    const menu = useMenu(pages.menuPage);

    return (
        <CMSContext.Provider value={{
            assets: assets,
            components,
            home,
            venue,
            services,
            bookings,
            menu
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