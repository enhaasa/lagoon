/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './ModalManager.module.scss';
import { useContext, useLayoutEffect, useRef, useState } from "react"

// Contexts
import { UIContext } from "@contexts/UI";

// Animations
import animate, { AnimationDuration } from '@utils/animate';

export default function ModalManager() {
    const {
        modals
    } = useContext(UIContext);

    const [ show, setShow ] = useState(false);
    const ref = useRef(null);

    const reversedModals = modals.get.slice().reverse();

    function shouldBlur(index: number) {
        if (modals.get.length < 2) return false;

        return index === 0;
    }

    useLayoutEffect(() => {
        if (!ref.current) return;

        if (modals.get.length > 0) {
            setShow(true);
            animate.darkenBgIn(ref);
        } else {
            animate.darkenBgOut(ref, { duration: AnimationDuration.Fast});
            setTimeout(() => {
                setShow(false);
            }, 300)
        }
    }, [ modals.get ]);
    
    return (
        <div 
            ref={ref} 
            className={styles.container}
            onClick={modals.closeCurrent}
            style={{ display: show ? 'grid' : 'none'}}
        >
            {reversedModals.map((modal: any, index: number) => (
                <div 
                    className={`${styles.modalDisplay} ${shouldBlur(index) ? 'blurred' : ''}`}
                    key={`Modal-${index}`} 
                >
                    {modal.component}
                </div>
            ))}
        </div>
    )
}