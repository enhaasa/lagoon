/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useOffCanvas, { IUseOffCanvas } from '@hooks/useOffCanvas';
import usePage, { IUsePage } from '@hooks/usePage';

export interface IUIContext {
    offCanvas: IUseOffCanvas;
    page: IUsePage;
}

const UIContext = createContext<IUIContext>({} as IUIContext);

function UIContextProvider({ children }: any) {
    const offCanvas = useOffCanvas();
    const page = usePage();

    return (
        <UIContext.Provider value={{
            offCanvas,
            page
        }}>
            {children}
        </UIContext.Provider>
    )
}

export { UIContextProvider, UIContext };