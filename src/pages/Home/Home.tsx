import styles from './Home.module.scss';
import { useContext } from 'react';

// Components
import Page from '@components/Page/Page';
import ContentModal from '@components/Modal/ContentModal';
import ImageModal from '@components/Modal/ImageModal/ImageModal';
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
import Sample1 from '@assets/images/sample_1.png';
import Sample2 from '@assets/images/sample_3.png';
import Sample3 from '@assets/images/sample_2.png';
import LagoonImg from '@assets/images/teaser_bg.png';

// Components
import ImageGalleryButton from '@components/ImageGalleryButton/ImageGalleryButton';
import Row from '@components/Row/Row';
import Location from '@components/Location/Location';
import Hero from '@components/Hero/Hero';
import Title from '@components/Title/Title';
import LagoonTeaser from '@components/lagoon/LagoonTeaser/LagoonTeaser';


const allImages = [
    {src: CatImg},
    {src: HagenLawyerImg},
    {src: LucyImg},
    {src: ManImg},
    {src: ShrekImg},
    {src: Lagoon1Img},
    {src: Lagoon2Img}
]

const images = {
    vertical: [
        {src: HagenLawyerImg},
    ],
    horizontal: [
        {src: Lagoon1Img},
        {src: Lagoon2Img},
        {src: LucyImg},
    ],
    sampleHorizontal: [
        {src: Sample1},
        {src: Sample2},
        {src: Sample3},
    ]
}

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
                images={allImages}
            />
        )
    }

    return (
        <Page>
            <div className={styles.container} style={{ backgroundImage: `url("${LagoonImg}")` }} >
                <LagoonTeaser />
            </div>
        </Page>    
    );
}

// <ImageGalleryButton images={images.sampleHorizontal}/>
