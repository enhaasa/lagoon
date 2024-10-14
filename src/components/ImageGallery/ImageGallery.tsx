import styles from './ImageGallery.module.scss';
import { useState, useRef, useEffect } from 'react';

// Components
import Image from '@components/Image/Image';
import Button from '@components/Button/Button';
import PreviewBar from './PreviewBar/PreviewBar';

// Icons
import icon from '@utils/icon';

import gsap from 'gsap';

export type GalleryImage = {
    headline?: string;
    src: string;
}

interface IImageGallery {
    images: GalleryImage[]
}

export default function ImageGallery({ images }: IImageGallery) {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ nextIndex, setNextIndex ] = useState<number | null>(null);
    const [ showDisplayImage, setShowDisplayImage ] = useState(true);
    
    const displayImageContainerRef = useRef(null);
    const displayImageRef = useRef(null);
    const nextImageRef = useRef<HTMLSpanElement>(null);

    function canNavigate(direction: HorizontalDirection) {
        if (direction === 'left') {
            return (selectedIndex !== 0);
        } else {
            return (images.length !== selectedIndex +1);
        }
    }

    function navigateDirection(direction: HorizontalDirection) {
        if (direction === 'left' && canNavigate('left')) {
            setNextIndex(selectedIndex -1);
        } else if (direction === 'right' && canNavigate('right')) {
            setNextIndex(selectedIndex +1); 
        }
    }

    useEffect(() => {
        if (nextIndex === null) return;

        // Slide next image
        (() => {
            if (nextIndex > selectedIndex) {
                const from = {opacity: '0', left: '100%'}
                const to = {opacity: '1', left: '50%'}
                gsap.fromTo(nextImageRef.current, from, to);
            } else {
                const from = {opacity: '0', left: '0'}
                const to = {opacity: '1', left: '50%'}
                gsap.fromTo(nextImageRef.current, from, to);
            }
        })();

        // Slide current image
        (() => {
            if (nextIndex > selectedIndex) {
                const from = {opacity: '1', marginLeft: '0'}
                const to = {opacity: '0', marginLeft: '-100vw'}
                gsap.fromTo(displayImageRef.current, from, to);
            } else {
                const from = {opacity: '1', marginRight: '0'}
                const to = {opacity: '0', marginRight: '-100vw'}
                gsap.fromTo(displayImageRef.current, from, to);
            }
        })();                

        setTimeout(() => {
            gsap.set(displayImageRef.current, {marginLeft: 0, marginRight: 0, opacity: 1});
            gsap.set(nextImageRef.current, {opacity: 0});

            setSelectedIndex(nextIndex);
            setShowDisplayImage(true);
            setNextIndex(null);
        }, 600);
    }, [ nextIndex, selectedIndex ]);

    function navigateIndex(index: number) {
        setNextIndex(index);
    }

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <span className={`${styles.navButton} ${!canNavigate('left') && styles.disabled}`}>
                    <Button 
                        icon={icon.chevronLeft} 
                        disabled={!canNavigate('left')}
                        onClick={() => navigateDirection('left')} 
                    />
                </span>
                
                <span className={styles.displayImageContainer} ref={displayImageContainerRef}>
                    
                    <span ref={displayImageRef} style={{ opacity: showDisplayImage ? '1': '0'}}>
                        <Image src={images[selectedIndex].src} className={styles.displayImage} />
                    </span>

                    {
                        nextIndex !== null &&
                        <span className={styles.nextImage} ref={nextImageRef}>
                            <Image src={images[nextIndex].src} className={styles.nextImageImg} />
                        </span>
                    }
                </span>

                <span className={`${styles.navButton} ${!canNavigate('right') && styles.disabled}`}>
                    <Button 
                        icon={icon.chevronRight} 
                        disabled={!canNavigate('right')}
                        onClick={() => navigateDirection('right')} 
                    />
                </span>
            </div>

            <nav className={styles.navigation}>
                <PreviewBar 
                    images={images}
                    navigateIndex={navigateIndex}
                    selectedIndex={selectedIndex}            
                />
            </nav>
        </div>    
    );
}
