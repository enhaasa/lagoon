/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useOffCanvas, { IUseOffCanvas } from '../hooks/useOffCanvas';

export interface IUIContext {
    offCanvas: IUseOffCanvas;
}

const UIContext = createContext<IUIContext>({} as IUIContext);

function UIContextProvider({ children }: any) {
    const offCanvas = useOffCanvas();

    return (
        <UIContext.Provider value={{
            offCanvas
        }}>
            {children}
        </UIContext.Provider>
    )
}

export { UIContextProvider, UIContext };