/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Button.module.scss';

// Components
import Icon from '../Icon/Icon';
import Text from '@components/Text/Text';

// Types
import { Foreground } from '@utils/colors';
import { Size } from '@utils/sizes';

interface IButton {
    name?: string;
    size?: Size;
    icon?: string;
    iconSize?: Size;
    iconRotate?: number;
    style?: Foreground | 'neutral' | false;
    disabled?: boolean;
    onClick: any;
}

export default function Button({ 
    name, 
    size = 'md',
    icon, 
    iconRotate = 0,
    style = 'primary',
    onClick,
    disabled = false
}: IButton) {
    return (
        <button 
            className={`${styles.container} ${style ? styles[style] : 'nobg'} ${styles[size]}`}
            style={{ transform: `rotate(${iconRotate}deg)`}} 
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
                <Text>{ name }</Text>
            </span>
        </button>    
    );
}
