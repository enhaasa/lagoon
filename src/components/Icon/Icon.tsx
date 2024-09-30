import styles from './Icon.module.scss';

// Types
import { Size } from '@utils/sizes';

interface IIcon {
    size?: Size;
    icon: string;
}

export default function Icon(
    { 
        size = 'md', 
        icon 
    }: IIcon) 
{
    return (
        <img 
            className={`${styles.container} ${styles[size]}`} 
            src={icon}
        />
    );
}
