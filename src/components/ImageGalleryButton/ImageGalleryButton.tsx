/* eslint-disable @typescript-eslint/no-explicit-any */
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

type GalleryButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface IImageGalleryButton {
    images: GalleryImage[];
    orientation?: Orientation;
    size?: GalleryButtonSize;
}

const verticalStyle = { 
    sm: { height: '220px', width: '150px' },
    md: { height: '120px', width: '250px' },
};
const horizontalStyle = { 
    sm: { height: '150px', width: '250px' },
    md: { height: '250px', width: '350px' },
    full: { height: '100%', width: '100%' }
 };

export default function ImageGalleryButton({ images, orientation = 'horizontal', size = 'sm' }: IImageGalleryButton) {
    const { modals } = useContext(UIContext);
    const modalId = useRef<false | number>(false);

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);

    function handleClick() {
       slide('out');
    }

    const slide = useCallback((direction: 'in' | 'out') => {
        if (!firstRef.current || !secondRef.current || !thirdRef.current) return;
    
        const refs = [firstRef, secondRef, thirdRef];
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
                        headline={''}
                        images={images}
                    />
                );
            }, (delay * refs.length) / 2);
        }
    }, [firstRef, secondRef, thirdRef, images, modals]); 
    
    useEffect(() => {
        if (!modals.get.find(modal => modal.id === modalId.current)) {
            slide('in');
        }
    }, [modals.get, slide]); 

    return (
        <button className={styles.container} onClick={handleClick} style={{ position: 'relative', ..._orientationStyle(orientation, size) }}>
            <div className={styles.images}>
                {images.length > 2 &&
                    <div 
                        ref={thirdRef}
                        className={`${styles.image} ${styles.third}`} 
                        style={{ backgroundImage: _urlify(images[2].src), ..._orientationStyle(orientation, size) }}
                    /> 
                }
                {images.length > 1 &&
                    <div 
                        ref={secondRef}
                        className={`${styles.image} ${styles.second}`} 
                        style={{ backgroundImage: _urlify(images[1].src), ..._orientationStyle(orientation, size) }}
                    />
                }
                <div 
                    ref={firstRef}
                    className={`${styles.image} ${styles.first}`} 
                    style={{ backgroundImage: _urlify(images[0].src), ..._orientationStyle(orientation, size) }}
                />
            </div>
        </button>
    );
}

function _urlify( image: string ) {
    return `url("${image}")`;
}

function _orientationStyle(orientation: Orientation, size: GalleryButtonSize) {
    return orientation === 'vertical' ? (verticalStyle as any)[size] : (horizontalStyle as any)[size];
}