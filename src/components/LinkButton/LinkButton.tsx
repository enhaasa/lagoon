import styles from './LinkButton.module.scss';
import { useContext } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';

interface ILinkButton {
    name: string;
    target: string;
    isNewTab?: boolean;
    isActive?: boolean;
    isExternalLink?: boolean;
    isUnderlined?: boolean;
}

export default function LinkButton({ 
    name, 
    target, 
    isNewTab = false, 
    isActive = false,
    isExternalLink,
    isUnderlined = false
}: ILinkButton ) {
    const { navigator } = useContext(PageContext);

    function handleClick() {
        if (isExternalLink) {
            navigator.externalNavigate(target, isNewTab);
        } else {
            navigator.dynamicNavigate(target, isNewTab);
        }
    }

    return (
        <button 
            className={`${styles.container} ${isActive ? styles.active : ''}`} 
            style={{ textDecoration: isUnderlined ? 'underline' : ''}}
            onClick={handleClick}
        >
            { name }
        </button>
    );
}
