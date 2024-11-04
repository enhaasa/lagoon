/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useContext } from 'react';
import styles from './Image.module.scss';

// Contexts
import { UIContext } from '@contexts/UI';

// Components
import ImageGalleryModal from '@components/Modal/ImageGalleryModal/ImageGalleryModal';
import Text from '@components/Text/Text';
import Icon from '@components/Icon/Icon';

// Icons
import icon from '@utils/icon';

// Types
import { GalleryImage } from '@components/ImageGallery/ImageGallery';

interface IImage {
    images: GalleryImage[];
    fullscreenable?: boolean;

    rounded?: boolean;
    className?: string;
    style?: any;
}

const Image = forwardRef<HTMLImageElement, IImage>(
    ({ images, fullscreenable = true, rounded = true, className, style }: IImage, ref) => {
        const { modals } = useContext(UIContext);

        function onClick() {
            if (!fullscreenable) return;
            
            modals.add(
                <ImageGalleryModal 
                    headline={'Images'}
                    images={images}
                />
            )
        }

        return (
            <button className={`${styles.container} ${fullscreenable && styles.fullscreenable}`} onClick={onClick}>
                <img 
                    src={images[0].src} 
                    className={`${styles.image} ${rounded ? styles.rounded : ''} ${className ? className : ''}`} 
                    style={style}
                    draggable={false} 
                    ref={ref}
                />

                {fullscreenable &&
                    <div className={styles.overlay}>
                        <div className={styles.additionalImages}>
                            {
                                images.length > 1 && 
                                <Text size='sm'>
                                    +{images.length -1} more
                                </Text>
                            }

                            <Icon icon={icon.fullscreen} />
                        </div>
                    </div>
                }
            </button>    
        );
    }
);

Image.displayName = 'Image';

export default Image;
