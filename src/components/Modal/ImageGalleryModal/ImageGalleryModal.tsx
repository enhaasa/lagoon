import styles from './ImageGalleryModal.module.scss';

// Components
import TransparentModal from '../TransparentModal/TransparentModal';
import ImageGallery, { GalleryImage } from '@components/ImageGallery/ImageGallery';

export interface IImageGalleryModal {
    id?: number;
    headline: string;
    images: GalleryImage[];
}

export default function ImageGalleryModal({ id, headline, images }: IImageGalleryModal) {

    return (
        <TransparentModal
            id={id}
            headline={headline}
        >
            <div className={styles.container}>
                <ImageGallery 
                    images={images}
                />
            </div>
        </TransparentModal> 
    );
}
