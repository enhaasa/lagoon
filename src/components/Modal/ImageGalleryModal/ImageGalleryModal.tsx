import styles from './ImageGalleryModal.module.scss';

// Components
import Modal from '../Modal';
import ImageGallery, { GalleryImage } from '@components/ImageGallery/ImageGallery';

export interface IImageGalleryModal {
    id?: number;
    headline: string;
    images: GalleryImage[];
}

export default function ImageGalleryModal({ id, headline, images }: IImageGalleryModal) {

    return (
        <Modal
            id={id}
            headline={headline}
        >
            <div className={styles.container}>
                <ImageGallery 
                    images={images}
                />
            </div>
        </Modal> 
    );
}
