import styles from './LinkButton.module.scss';
import { useContext } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';

// Components
import Text from '@components/Text/Text';

// Types
import { Size } from '@utils/sizes';

interface ILinkButton {
    name: string;
    target: string;
    isNewTab?: boolean;
    isActive?: boolean;
    isExternalLink?: boolean;
    isUnderlined?: boolean;
    size?: Size;
    callback?: any;
}

export default function LinkButton({ 
    name, 
    target, 
    isNewTab = false, 
    isActive = false,
    isExternalLink,
    isUnderlined = false,
    size = 'md',
    callback
}: ILinkButton ) {
    const { navigator } = useContext(PageContext);

    function handleClick() {
        if (isExternalLink) {
            navigator.externalNavigate(target, isNewTab);
        } else {
            navigator.dynamicNavigate(target, isNewTab);
        }

        if (callback) {
            callback();
        }
    }

    return (
        <button 
            className={`${styles.container} ${isActive ? styles.active : ''}`} 
            style={{ textDecoration: isUnderlined ? 'underline' : ''}}
            onClick={handleClick}
        >
            <Text size={size}>{ name }</Text>
        </button>
    );
}
