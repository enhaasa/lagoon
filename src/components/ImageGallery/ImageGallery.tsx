import styles from './ImageGallery.module.scss';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';

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
    const [ imageWidth, setImageWidth ] = useState(0);
    
    const slideBoardContainerRef = useRef<HTMLSpanElement>(null);
    const slideBoardRef = useRef<HTMLSpanElement>(null);
    const imageContainerRef = useRef(null);
    const previousImageWidth = useRef(0);

    function canNavigate(direction: HorizontalDirection) {
        if (direction === 'left') {
            return (selectedIndex !== 0);
        } else {
            return (images.length !== selectedIndex +1);
        }
    }

    function navigateDirection(direction: HorizontalDirection) {
        if (direction === 'left' && canNavigate('left')) {
            setSelectedIndex(selectedIndex -1);
        } else if (direction === 'right' && canNavigate('right')) {
            setSelectedIndex(selectedIndex +1); 
        }
    }

    useEffect(() => {
        if (!slideBoardContainerRef.current) return;
        
        const width = slideBoardContainerRef.current.getBoundingClientRect().width;
        const margin = -(width * selectedIndex);

        if (imageWidth !== previousImageWidth.current) {
            gsap.set(slideBoardRef.current, { marginLeft: margin });
            previousImageWidth.current = imageWidth;
        } else {
            gsap.to(slideBoardRef.current, { marginLeft: margin });
        }

    }, [ selectedIndex, imageWidth ]);

    useLayoutEffect(() => {
        function updateWidth() {
            setTimeout(() => {
                if (slideBoardContainerRef.current) {
                    setImageWidth(slideBoardContainerRef.current.getBoundingClientRect().width)
                }
            }, 0)
        }

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return(() => {
            window.removeEventListener('resize', updateWidth);
        });
    }, []);

    function navigateIndex(index: number) {
        setSelectedIndex(index);
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
                
                <span ref={slideBoardContainerRef} className={styles.slideBoardContainer}>
                    <span ref={slideBoardRef} className={styles.slideBoard}>
                         {
                            images.map(image => (
                                <span ref={imageContainerRef} className={styles.imageContainer} style={{ width: imageWidth }}>
                                    <Image src={image.src} className={styles.image} />
                                </span>
                            ))
                         }
                    </span>
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
