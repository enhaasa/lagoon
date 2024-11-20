import styles from './Menu.module.scss';

// Components
import Page from '@components/Page/Page';
import MenuList from '@components/MenuList/MenuList';

export default function Menu() {

    return (
        <Page>
            <div className={styles.container}>
                <MenuList />
            </div>
        </Page>    
    );
}
