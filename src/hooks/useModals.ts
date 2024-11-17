/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactElement } from 'react';

export type TModal = {
    id: number;
    component: TModalComponent;
}

export type TModalComponent = ReactElement;

export interface IUseModals {
    get: TModal[];
    killAll: any;
    lifeSupportList: number[];
    add: (modalComponent: TModalComponent) => number | false;
    kill: (id: number) => void;
    remove: (id: number) => void;
    closeCurrent: () => void;
}

export default function useModals() {
    const [ modals, setModals ] = useState<TModal[]>([]);
    const [ lifeSupportList, setLifeSupportList ] = useState<number[]>([]);
    const [ isChangingState, setIsChangingState ] = useState<boolean>(false);

    function add(modalComponent: TModalComponent) {
        if (isChangingState) return false;
        setIsChangingState(true);

        const id = modals.length;

        const ModalWithId = React.cloneElement(modalComponent, { id });
        setModals((prev) => [{
            id,
            component: ModalWithId
        }, ...prev]);
        setLifeSupportList(prev => [...prev, id]);

        setTimeout(() => {
            setIsChangingState(false);
        }, 300);

        return id;
    }

    function kill(id: number) {
        setModals((prev) => prev.filter((m) => m.id !== id));

        setTimeout(() => {
            setIsChangingState(false);
        }, 300);
    }
    
    function unplugLifeSupport(id: number) {
        if (isChangingState) return false;

        setIsChangingState(true);
        setLifeSupportList((prev) => prev.filter((i) => i !== id));
    }

    function closeCurrent() {
        unplugLifeSupport(lifeSupportList[lifeSupportList.length -1]);
    }

    function killAll() {
        setModals([]);
        setLifeSupportList([]);
    }

    return{
        get: modals,
        killAll,
        lifeSupportList,
        add,
        kill,
        remove: unplugLifeSupport,
        closeCurrent
    }
}