import styles from './NavListItem.module.scss';

// Types
import { NavItem } from '@config/navbar';

// Icons
import ChevronIcon from '@assets/icons/chevron-right.svg';

// Utils
import useNavigation from '@hooks/useNavigation';

interface INavListItem {
    item: NavItem,
    callback?: AnyFunction;
}

export default function NavListItem({ item }: INavListItem) {

    const navigator = useNavigation();

    return (
        <button 
            className={styles.container} 
            onClick={() => navigator.dynamicNavigate(item.target, item.isNewTab)}
        >
            <span className={styles.name}>{ item.name }</span>
            <span className={styles.icon}>
                <img src={ChevronIcon} />
            </span>
        </button>    
    );
}
