import styles from './Navbar.module.scss';
import { useContext } from 'react';

// Components
import NavList from '@components/NavList/NavList';
import LinkButton from '../LinkButton/LinkButton';
import Button from '../Button/Button';

// Contexts
import { UIContext } from '@contexts/UI';

// Icons
import IconBurgerMenu from '../../assets/icons/burger-menu.svg';

// Types
import navbar from '@config/navbar';

export default function Navbar() {
    const { offCanvas } = useContext(UIContext);

    function showOffCanvas() {

        offCanvas.openWithContent(
            <NavList items={navbar} />
        );
    }
    
    return (
        <div className={styles.container}>
            <span className={styles.burger}>
                {
                    <Button 
                        icon={IconBurgerMenu}
                        background={false}
                        onClick={showOffCanvas} 
                    />
                }
            </span>

            <span className={styles.nav}>
                { navbar.map((item, index) => (
                    <LinkButton 
                        key={`NavbarItem${index}`}
                        name={item.name}
                        target={item.target}
                    />
                )) }
            </span>
        </div>    
    );
}
