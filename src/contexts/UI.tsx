/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useOffCanvas, { IUseOffCanvas } from '@hooks/useOffCanvas';
import usePage, { IUsePage } from '@hooks/usePage';
import useModals, { IUseModals } from '@hooks/useModals';

export interface IUIContext {
    offCanvas: IUseOffCanvas;
    page: IUsePage;
    modals: IUseModals;
}

const UIContext = createContext<IUIContext>({} as IUIContext);

function UIContextProvider({ children }: any) {
    const offCanvas = useOffCanvas();
    const page = usePage();
    const modals = useModals();

    return (
        <UIContext.Provider value={{
            offCanvas,
            page,
            modals
        }}>
            {children}
        </UIContext.Provider>
    )
}

export { UIContextProvider, UIContext };