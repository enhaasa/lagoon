import { ReactNode, useContext, useEffect, useRef, useLayoutEffect } from "react";
import styles from './Modal.module.scss';

// Contexts
import { UIContext } from "@contexts/UI";

// Animations
import animate, { AnimationDuration } from "@utils/animate";

// Icons
import icon from "@utils/icon";
import Icon from "@components/Icon/Icon";

interface IModal {
    id?: number;
    headline: string;
    message?: string;
    children?: ReactNode;
    closable?: boolean;
    background?: string;
}

export default function Modal({
    id,
    headline,
    message,
    children,
    closable = true,
    background
}: IModal) {
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
                style={{justifyContent: `${closable ? 'space-between' : 'center'}`}}
            >
                <span>{headline}</span>
                {closable && 
                    <button onClick={handleClose} className={styles.closeButton}>
                        <Icon icon={icon.close} />
                    </button>
                }
            </div>
            <div className={styles.message}>{message}</div>
            <div className={styles.content}>
                {children}
                <div className={styles.contentOverlay} />
            </div>
            <div className={styles.backgroundWrapper}>
                <div className={styles.background} style={{ backgroundImage: `url("${background}")` }} />
            </div>
        </div>
    )
}