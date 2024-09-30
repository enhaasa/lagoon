/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useNavigation, { IUseNavigation } from './../hooks/useNavigation';

export interface IUIContext {
    navigator: IUseNavigation;
}

const PageContext = createContext<IUIContext>({} as IUIContext);

function PageContextProvider({ children }: any) {
    const navigator = useNavigation();

    return (
        <PageContext.Provider value={{
            navigator
        }}>
            {children}
        </PageContext.Provider>
    )
}

export { PageContextProvider, PageContext };