import styles from './Home.module.scss';

// Components
import Page from '@components/Page/Page';

// Images
import LagoonImg from '@assets/images/teaser_bg.png';

// Components
import LagoonTeaser from '@components/lagoon/LagoonTeaser/LagoonTeaser';

export default function Home() {
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
            <div className={styles.container} style={{ backgroundImage: `url("${LagoonImg}")` }} >
                <LagoonTeaser />
            </div>
        </Page>    
    );
}
