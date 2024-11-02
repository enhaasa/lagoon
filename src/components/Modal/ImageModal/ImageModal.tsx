import styles from './ImageModal.module.scss';

// Components
import Modal from "../Modal";
import Image from '@components/Image/Image';

export interface IImageModal {
    id?: number;
    headline: string;
    src: string;
    message?: string;
}

export default function ImageModal({ id, headline, src, message }: IImageModal) {
    
    return (
        <Modal
            id={id}
            headline={headline}
            message={message}
        >
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image images={[{src}]} />
                </div>
            </div>
        </Modal>
    )
}
