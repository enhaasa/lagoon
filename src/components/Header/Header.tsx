import styles from './Header.module.scss';

// Components
import Navbar from '../Navbar/Navbar';

export default function Header() {

    return (
        <div className={styles.container}>
            <Navbar />
        </div>    
    );
}
