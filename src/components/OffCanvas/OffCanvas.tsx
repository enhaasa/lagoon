/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './OffCanvas.module.scss';
import { useContext, useLayoutEffect, useRef } from 'react';

// Contexts
import { UIContext } from '@contexts/UI';

// Animations
import animate from '@utils/animate';
import { AnimationDuration } from '@utils/animate';

// Components
import Button from '@components/Button/Button';

// Utils
import icon from '@utils/icon';

export default function OffCanvas() {
    const { offCanvas } = useContext(UIContext);
    const ref = useRef(null);
    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!ref.current) return;

        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        const animation = offCanvas.isShown
            ? animate.slideIn(ref, 'left', { 
                duration: AnimationDuration.Fast,
                distance: '100%'
            })
            : animate.slideOut(ref, 'left', { 
                duration: AnimationDuration.Fast,
                distance: '100%'
            });

        return () => {
            animation?.kill();
        }
    }, [ offCanvas.isShown ]);

    function close() {
        offCanvas.hide();
    }

    return (
        <div 
            className={styles.container} 
            ref={ref}
        >
            <div className={styles.navbar}>
                <Button 
                    icon={icon.close}
                    onClick={close}
                />
            </div>

            <div className={styles.content}>
                { offCanvas.content }
            </div>
        </div>
    );
}
