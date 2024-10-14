import styles from './Home.module.scss';
import { useContext } from 'react';

// Components
import Page from '@components/Page/Page';
import ContentModal from '@components/Modal/ContentModal';
import ImageModal from '@components/Modal/ImageModal/ImageModal';
import ImageGallery from '@components/ImageGallery/ImageGallery';
import Column from '@components/Column/Column';
import ImageGalleryModal from '@components/Modal/ImageGalleryModal/ImageGalleryModal';

// Contexts
import { UIContext } from '@contexts/UI';

// Images
import CatImg from '@assets/images/cat.webp';
import HagenLawyerImg from '@assets/images/hagen_lawyer.png';
import LucyImg from '@assets/images/lucy.jpg';
import ManImg from '@assets/images/man.webp';
import ShrekImg from '@assets/images/shrex.png';
import Lagoon1Img from '@assets/images/lagoon1.png';
import Lagoon2Img from '@assets/images/lagoon2.png';

const images = [
    {src: CatImg},
    {src: HagenLawyerImg},
    {src: LucyImg},
    {src: ManImg},
    {src: ShrekImg},
    {src: Lagoon1Img},
    {src: Lagoon2Img}
]

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

    function handleImageGalleryModal() {
        modals.add(
            <ImageGalleryModal 
                headline={'Images'}
                images={images}
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

                <button onClick={handleImageGalleryModal}>
                    create imageGallery modal
                </button>

                <Column>
                    <ImageGallery 
                        images={images}
                    />
                </Column>

            </div>
        </Page>    
    );
}
