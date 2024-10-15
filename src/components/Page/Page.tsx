import styles from './Page.module.scss';
import { useLayoutEffect, useRef, useContext } from 'react';

// Contexts
import { UIContext } from '@contexts/UI';

// Animations
import animate from '@utils/animate';

interface IPage {
    children: React.ReactNode;
}

export default function Page({ children }: IPage) {
    const { page } = useContext(UIContext);

    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = page.isShow 
            ? animate.slideIn(ref, 'bottom', {fade: true})
            : animate.slideOut(ref, 'bottom', {fade: true})

        return () => {
            animation?.kill();
        }

    }, [page.isShow]);

    return (
        <div className={styles.container} ref={ref}>
            {children}
        </div>    
    );
}
