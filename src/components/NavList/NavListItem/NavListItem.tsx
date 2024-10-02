import styles from './NavListItem.module.scss';
import { useContext } from 'react';

// Types
import { NavItem } from '@config/navbar';

// Icons
import icon from '@utils/icon';

// Contexts
import { PageContext } from '@contexts/Page';

interface INavListItem {
    item: NavItem,
    callback?: AnyFunction;
}

export default function NavListItem({ item }: INavListItem) {
    const { navigator } = useContext(PageContext);

    return (
        <button 
            className={`${styles.container} ${item.isActive ? styles.active : ''}`} 
            onClick={() => navigator.dynamicNavigate(item.target, item.isNewTab || false)}
        >
            <span className={styles.name}>{ item.name }</span>
            <span className={styles.icon}>
                <img src={icon.chevronRight} />
            </span>
        </button>    
    );
}
