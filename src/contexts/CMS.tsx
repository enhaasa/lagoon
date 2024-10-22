/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Clients
import { ContentfulClient } from '@service_clients/ContentfulClient';

// Hooks
import useHome, { IUseHome } from '@hooks/useCMS';

export interface ICMSContext {
    home: IUseHome;
}

const CMSContext = createContext<ICMSContext>({} as ICMSContext);

function CMSContextProvider({ children }: any) {
    const client = new ContentfulClient();

    const home = useHome(client);

    return (
        <CMSContext.Provider value={{
            home
        }}>
            {children}
        </CMSContext.Provider>
    )
}

export { CMSContextProvider, CMSContext };