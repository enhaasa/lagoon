import styles from './TheVenue.module.scss';

// Components
import Page from '@components/Page/Page';

export default function TheVenue() {

    return (
        <Page>
            <div className={styles.container}>
                The Venue
            </div>    
        </Page>
    );
}
