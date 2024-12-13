import styles from './Home.module.scss';

import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import LagoonTeaser from '@components/lagoon/LagoonTeaser/LagoonTeaser';
import Page from '@components/Page/Page';

export default function Home() {
    const { home } = useContext(CMSContext);

    return (
        <Page>
            <div 
                className={styles.container} 
                style={{ backgroundImage: `url("${home.content?.background}")` }} 
            >
                <LagoonTeaser />
            </div>
        </Page>    
    );
}
