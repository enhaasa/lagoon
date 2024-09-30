import styles from './Page.module.scss';
import { useLayoutEffect, useRef } from 'react';

// Animations
import animate from '@utils/animate';

interface IPage {
    children: React.ReactNode;
}

export default function Page({ children }: IPage) {

    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = animate.slideIn(ref, 'bottom', {fade: true});


        return () => {
            animation?.kill();
        }

    }, []);

    return (
        <div className={styles.container} ref={ref}>
            {children}
        </div>    
    );
}
