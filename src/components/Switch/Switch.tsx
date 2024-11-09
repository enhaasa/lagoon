/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Switch.module.scss';
import { useState } from 'react';

// Components
import Text from '@components/Text/Text';

interface ISwitch {
    title?: string;
    initState?: boolean;
    callback?: any;
}

export default function Switch({ title, initState = false, callback }: ISwitch) {

    const [ state, setState ] = useState<boolean>(initState);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setState(!state);
        callback(!state);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Text size='sm'>{title}</Text>
            </div>

            <button 
                className={`${styles.track} ${state ? styles.on : styles.off}`} 
                onClick={handleClick}
            >
                <div className={`${styles.knob} ${state ? styles.right : styles.left}`} />
            </button>
        </div>    
    );
}
