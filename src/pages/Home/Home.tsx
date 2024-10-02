import styles from './Home.module.scss';
import { useContext } from 'react';

// Components
import Page from '@components/Page/Page';
import ContentModal from '@components/Modal/ContentModal';
import ImageModal from '@components/Modal/ImageModal/ImageModal';
import Image from '@components/Image/Image';
import Column from '@components/Column/Column';

// Contexts
import { UIContext } from '@contexts/UI';

// Images
import CatImg from '@assets/images/cat.webp';

export default function Home() {
    const { modals } = useContext(UIContext);

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

    return (
        <Page>
            <div className={styles.container}>
                Home page

                <button onClick={handleContentModal}>
                    create content modal
                </button>

                <button onClick={handleImageModal}>
                    create image modal
                </button>

                <Column>
                    <Image src={CatImg} />
                </Column>

            </div>
        </Page>    
    );
}
