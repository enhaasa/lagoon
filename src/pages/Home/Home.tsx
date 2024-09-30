import styles from './Home.module.scss';

// Components
import Page from '@components/Page/Page';

export default function Home() {

    return (
        <Page>
            <div className={styles.container}>
                Home page
            </div>
        </Page>    
    );
}
