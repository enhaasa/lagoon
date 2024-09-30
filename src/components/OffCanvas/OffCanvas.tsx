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

// Icons
import XIcon from '@assets/icons/x.svg';

export default function OffCanvas() {

    const { offCanvas } = useContext(UIContext);
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = offCanvas.isShow
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
    }, [offCanvas.isShow]);

    function close() {
        animate.slideOut(ref, 'left', { 
            duration: AnimationDuration.Fast,
            distance: '100%'
        });
        setTimeout(() => offCanvas.hide(), 300);
    }

    return (
        <div 
            className={styles.container} 
            ref={ref}
            style={{ display: offCanvas.isShow ? 'block' : 'none' }}
        >
            <div className={styles.navbar}>
                <Button 
                    icon={XIcon}
                    onClick={close}
                />
            </div>

            <div className={styles.content}>
                { offCanvas.content }
            </div>
        </div>
    );
}
