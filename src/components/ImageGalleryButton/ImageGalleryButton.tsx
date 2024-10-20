import { useContext, useRef, useCallback, useEffect } from 'react';
import styles from './ImageGalleryButton.module.scss';

// Types
import { type GalleryImage, } from '@components/ImageGallery/ImageGallery';

// Components
import ImageGalleryModal from '@components/Modal/ImageGalleryModal/ImageGalleryModal';

// Contexts
import { UIContext } from '@contexts/UI';

// Animations
import gsap from 'gsap';

interface IImageGalleryButton {
    images: GalleryImage[];
    orientation?: Orientation;
}

const verticalStyle = { height: '220px', width: '150px' };
const horizontalStyle = { height: '150px', width: '250px' };

export default function ImageGalleryButton({ images, orientation = 'horizontal' }: IImageGalleryButton) {
    const { modals } = useContext(UIContext);
    const modalId = useRef<null | number>(null);

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);

    const firstRender = useRef(true);

    function handleClick() {
       slide('out');
    }

    const slide = useCallback((direction: 'in' | 'out') => {
        if (!firstRef.current || !secondRef.current || !thirdRef.current) return;
    
        const refs = [thirdRef, secondRef, firstRef];
        const delay = 150;
    
        refs.forEach((ref, index) => {
            if (direction === 'out') {
                setTimeout(() => {
                    gsap.to(ref.current, { top: '-100px', opacity: 0 });
                }, delay * index);
            } else {
                setTimeout(() => {
                    gsap.to(ref.current, { top: '0', opacity: 1 });
                }, (delay * index) / 2);
            }
        });
    
        if (direction === 'out') {
            setTimeout(() => {
                modalId.current = modals.add(
                    <ImageGalleryModal 
                        headline={'Images'}
                        images={images}
                    />
                );
            }, (delay * refs.length) / 2);
        }
    }, [firstRef, secondRef, thirdRef, images, modals]); 
    
    useEffect(() => {
        if (!modals.get.find(modal => modal.id === modalId.current)) {
            if (firstRender.current === true) {
                firstRender.current = false;
                return;
            }

            slide('in');
        }
    }, [modals.get, slide]); 

    return (
        <button className={styles.container} onClick={handleClick} style={{ position: 'relative'}}>
            <div className={styles.images}>
                {images.length > 2 &&
                    <div 
                        ref={thirdRef}
                        className={`${styles.image} ${styles.third}`} 
                        style={{ backgroundImage: _urlify(images[2].src), ..._orientationStyle(orientation) }}
                    /> 
                }
                {images.length > 1 &&
                    <div 
                        ref={secondRef}
                        className={`${styles.image} ${styles.second}`} 
                        style={{ backgroundImage: _urlify(images[1].src), ..._orientationStyle(orientation) }}
                    />
                }
                <div 
                    ref={firstRef}
                    className={`${styles.image} ${styles.first}`} 
                    style={{ backgroundImage: _urlify(images[0].src), ..._orientationStyle(orientation) }}
                />
            </div>
        </button>
    );
}

function _urlify( image: string ) {
    return `url("${image}")`;
}

function _orientationStyle(orientation: Orientation) {
    return orientation === 'vertical' ? verticalStyle : horizontalStyle;
}