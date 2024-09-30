/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './OffCanvas.module.scss';
import { useContext, useLayoutEffect, useRef } from 'react';

// Contexts
import { UIContext } from '@contexts/UI';

// Animations
import gsap from 'gsap';

// Components
import Button from '@components/Button/Button';

// Icons
import XIcon from '@assets/icons/x.svg';

export default function OffCanvas() {

    const { offCanvas } = useContext(UIContext);
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        if (offCanvas.isShow) {
            gsap.to(ref.current, {left: '0', duration: 0.3});
        } else {
            gsap.to(ref.current, {left: '-100%', duration: 0.3});
        }
    }, [offCanvas.isShow]);

    function close() {
        gsap.to(ref.current, {left: '-100%', duration: 0.3});
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
