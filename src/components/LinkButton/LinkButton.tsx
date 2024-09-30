import styles from './LinkButton.module.scss';
import { useContext } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';

interface ILinkButton {
    name: string;
    target: string;
    isNewTab?: boolean;
    isActive?: boolean
}

export default function LinkButton({ 
    name, 
    target, 
    isNewTab = false, 
    isActive = false 
}: ILinkButton ) {
    const { navigator } = useContext(PageContext);

    return (
        <button 
            className={`${styles.container} ${isActive ? styles.active : ''}`} 
            onClick={() => navigator.dynamicNavigate(target, isNewTab)}
        >
            { name }
        </button>
    );
}
