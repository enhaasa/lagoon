/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './ModalManager.module.scss';
import { useContext } from "react"

// Contexts
import { UIContext } from "@contexts/UI";


export default function ModalManager() {
    const {
        modals
    } = useContext(UIContext);

    const reversedModals = modals.get.slice().reverse();

    function shouldBlur(index: number) {
        if (modals.get.length < 2) return false;

        return index === 0;
    }

    return (
        <>
            {
            modals.get.length > 0 &&
                <div className={styles.container} onClick={modals.closeCurrent}>

                    {reversedModals.map((modal: any, index: number) => (
                        <div 
                            className={`modal-display ${shouldBlur(index) ? 'blurred' : ''}`}
                            key={`Modal${index}`} 
                        >
                            {modal.component}
                        </div>
                    ))}
                </div>
            }
        </>

    )
}