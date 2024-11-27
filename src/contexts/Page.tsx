/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useNavigation, { IUseNavigation } from './../hooks/useNavigation';
import useStoredEvents, { IUseStoredEvents } from '@hooks/useStoredEvents';

export interface IUIContext {
    navigator: IUseNavigation;
    storedEvents: IUseStoredEvents;
}

const PageContext = createContext<IUIContext>({} as IUIContext);

function PageContextProvider({ children }: any) {
    const navigator = useNavigation();
    const storedEvents = useStoredEvents();

    return (
        <PageContext.Provider value={{
            navigator,
            storedEvents
        }}>
            {children}
        </PageContext.Provider>
    )
}

export { PageContextProvider, PageContext };