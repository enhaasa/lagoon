import { ReactNode, useContext, useEffect, useRef, useLayoutEffect } from "react";
import styles from './TransparentModal.module.scss';

// Components
import Button from "@components/Button/Button";

// Contexts
import { UIContext } from "@contexts/UI";

// Animations
import animate, { AnimationDuration } from "@utils/animate";

// Icons
import icon from "@utils/icon";

interface ITransparentModal {
    id?: number;
    headline: string;
    message?: string;
    children?: ReactNode;
}

export default function TransparentModal({
    id,
    headline,
    message,
    children
}: ITransparentModal) {
    const { modals } = useContext(UIContext);
    const ref = useRef(null);

    function handleModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
    }

    function handleClose() {
        modals.closeCurrent();
    }

    useLayoutEffect(() => {
        if (!ref.current) return;
        const animation = animate.slideIn(ref, 'top', {fade: true, duration: AnimationDuration.Fast});

        return () => {
            animation?.kill();
        }
    }, []);
    
    useEffect(() => {
        if (id === undefined) return;
        
        if (!modals.lifeSupportList.includes(id)) {
            animate.slideOut(ref, 'top', {fade: true, duration: AnimationDuration.Fast});

            setTimeout(()=> {
                modals.kill(id);
            }, 300);
        }
    }, [id, modals, modals.lifeSupportList]);

    return (
        <div className={styles.container} onClick={handleModalClick} ref={ref}>
            <div 
                className={styles.header} 
                style={{justifyContent: 'space-between'}}
            >
                <span>{headline}</span>
                <Button icon={icon.close} onClick={handleClose} size={'lg'} />
            </div>
            <div className={styles.message}>{message}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}