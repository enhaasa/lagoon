import styles from './Home.module.scss';
import { useContext } from 'react';

// Components
import Page from '@components/Page/Page';
import ContentModal from '@components/Modal/ContentModal';

// Contexts
import { UIContext } from '@contexts/UI';

export default function Home() {
    const { modals } = useContext(UIContext);

    function handleClick() {
        modals.add(
        <ContentModal
            headline={'Title'}
        >
            <p>
                content
            </p>
        </ContentModal>
        )
    }

    return (
        <Page>
            <div className={styles.container}>
                Home page

                <button onClick={handleClick}>
                    create test modal
                </button>
            </div>
        </Page>    
    );
}
