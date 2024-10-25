import styles from './Home.module.scss';

import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import LagoonTeaser from '@components/lagoon/LagoonTeaser/LagoonTeaser';
import Page from '@components/Page/Page';

export default function Home() {
    const { home } = useContext(CMSContext);

    /*
        function handleContentModal() {
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

        function handleImageModal() {
            modals.add(
                <ImageModal 
                    headline={'A dog.'}
                    src={CatImg}
                />
            )
        }

        function handleImageGalleryModal() {
            modals.add(
                <ImageGalleryModal 
                    headline={'Images'}
                    images={allImages}
                />
            )
        }
    */

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
