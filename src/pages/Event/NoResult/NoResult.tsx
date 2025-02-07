import styles from './NoResult.module.scss';
import { useLayoutEffect, useRef } from 'react';

// Animations
import animate from '@utils/animate';

// Components
import Text from '@components/Text/Text';

interface INoResult {
    text: string;
}

export default function NoResult({ text }: INoResult) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = animate.slideIn(ref, 'bottom', {fade: true})

        return () => {
            animation?.kill();
        }
    }, []);

    return (
        <div className={styles.container} ref={ref}>
            <Text>{text}</Text>
        </div>    
    );
}
