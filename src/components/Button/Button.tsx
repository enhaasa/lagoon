/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Button.module.scss';

// Components
import Icon from '../Icon/Icon';

// Types
import { Foreground } from '@utils/colors';
import { Size } from '@utils/sizes';

interface IButton {
    name?: string;
    size?: Size;
    icon?: string;
    iconSize?: Size;
    style?: Foreground | 'neutral' | false;
    disabled?: boolean;
    onClick: any;
}

export default function Button({ 
    name, 
    size = 'md',
    icon, 
    style = 'primary',
    onClick,
    disabled = false
}: IButton) {
    return (
        <button 
            className={`${styles.container} ${style ? styles[style] : 'nobg'} ${styles[size]}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {icon &&
                <span className={styles.icon}>
                    <Icon 
                        size={size}
                        icon={icon}
                    />
                </span>
            }
            <span className={styles.name}>
                { name }
            </span>
        </button>    
    );
}
