import styles from './NavList.module.scss';

// Components
import NavListItem from './NavListItem/NavListItem';

// Types
import { NavItem } from '@config/navbar';

interface INavList {
    items: NavItem[]
}

export default function NavList({ items }: INavList) {

    return (
        <div className={styles.container}>
            {
                items.map((item, i) => (
                    <NavListItem item={item} key={`NavListItem-${i}`} />
                ))
            }
        </div>    
    );
}
