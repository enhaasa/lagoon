import styles from './Navbar.module.scss';
import { useContext } from 'react';

// Components
import NavList from '@components/NavList/NavList';
import LinkButton from '../LinkButton/LinkButton';
import Button from '../Button/Button';
import EventNavigation from '@components/EventNavigation/EventNavigation';

// Contexts
import { UIContext } from '@contexts/UI';
import { PageContext } from '@contexts/Page';

// Icons
import IconBurgerMenu from '../../assets/icons/burger-menu.svg';

// Types
import navbar from '@config/navbar';

export default function Navbar() {
    const { offCanvas } = useContext(UIContext);
    const { navigator } = useContext(PageContext);

    function openMenu() {
        offCanvas.openWithContent(
            <NavList items={navbar} />
        );
    }

    function getIsCurrentPathByIndex(path: string) {
        if (!navigator) return false;

        const result = (navigator.currentPageIndex.get === navigator.getPageIndexByPath(path));

        return result;
    }
    
    return (
        <div className={styles.container}>
            <span className={styles.burger}>
                {
                    <Button 
                        icon={IconBurgerMenu}
                        style={false}
                        onClick={openMenu} 
                    />
                }
            </span>

            <span className={styles.nav}>
                { navbar.map((item, index) => (
                    <LinkButton 
                        key={`NavbarItem${index}`}
                        name={item.name}
                        icon={item.icon}
                        target={item.target}
                        isActive={getIsCurrentPathByIndex(item.target)}
                    />
                )) }
            </span>

            <span className={styles.eventNav}>
                <EventNavigation />
            </span>
        </div>    
    );
}
