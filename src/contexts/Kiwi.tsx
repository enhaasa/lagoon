/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Clients
import { KiwiClient } from '@service_clients/KiwiClient';

// Hooks
import useMenu, { UseMenu } from '@hooks/kiwi/useMenu';

export interface IKiwiContext {
    menu: UseMenu;
}

const KiwiContext = createContext<IKiwiContext>({} as IKiwiContext);
const client = new KiwiClient();

function KiwiContextProvider({ children }: any) {
   const menu = useMenu(client);

    return (
        <KiwiContext.Provider value={{
            menu
        }}>
            {children}
        </KiwiContext.Provider>
    )
}

export { KiwiContextProvider, KiwiContext };