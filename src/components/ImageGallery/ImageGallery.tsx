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
    images: GalleryImage[];
    isModal?: boolean;
}

export default function ImageGallery({ images, isModal = false }: IImageGallery) {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ imageWidth, setImageWidth ] = useState(-1);
    const [ imageMaxHeight, setImageMaxHeight ] = useState(-1);
    const [ windowHeight, setWindowHeight ] = useState(-1);
    
    const ref = useRef<HTMLDivElement>(null);
    const slideBoardContainerRef = useRef<HTMLSpanElement>(null);
    const slideBoardRef = useRef<HTMLSpanElement>(null);
    const navigationRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
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
        if (!slideBoardContainerRef.current 
            || !carouselRef.current 
            || !navigationRef.current 
            || !imageContainerRef.current
        ) return;
        
        const width = slideBoardContainerRef.current.getBoundingClientRect().width;
        const margin = -(width * selectedIndex);

        setTimeout(() => {
            const windowHeight = window.innerHeight;
            const navigationHeight = navigationRef.current!.getBoundingClientRect().height;
            const windowPosY = imageContainerRef.current!.getBoundingClientRect().top;
            const maxHeight = windowHeight - navigationHeight - windowPosY -20;
    
            setImageMaxHeight(maxHeight);
        }, 300);

        if (imageWidth !== previousImageWidth.current) {
            gsap.set(slideBoardRef.current, { marginLeft: margin });
            previousImageWidth.current = imageWidth;
        } else {
            gsap.to(slideBoardRef.current, { marginLeft: margin });
        }

    }, [ selectedIndex, imageWidth, windowHeight ]);

    useLayoutEffect(() => {
        gsap.set(ref.current, { opacity: 0 });

        function updateWidth() {
            setTimeout(() => {
                if (slideBoardContainerRef.current && carouselRef.current) {
                    setImageWidth(slideBoardContainerRef.current.getBoundingClientRect().width);
                    if (isModal) {
                        setWindowHeight(window.innerHeight);
                    }
                }
            }, 0);
        }

        updateWidth();
        window.addEventListener('resize', updateWidth);

        setTimeout(() => {
            gsap.to(ref.current, { opacity: 1, duration: 0.5 });
        }, 400);

        return(() => {
            window.removeEventListener('resize', updateWidth);
        });
    }, [ isModal ]);

    function navigateIndex(index: number) {
        setSelectedIndex(index);
    }

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.carousel} ref={carouselRef}>
                <span className={`${styles.navButton} ${!canNavigate('left') && styles.disabled}`}>
                    <Button 
                        style={false}
                        icon={icon.chevronLeft} 
                        disabled={!canNavigate('left')}
                        onClick={() => navigateDirection('left')} 
                    />
                </span>
                
                <span ref={slideBoardContainerRef} className={styles.slideBoardContainer}>
                    <span ref={slideBoardRef} className={styles.slideBoard}>
                         {
                            images.map((image, index) => (
                                <span ref={imageContainerRef} 
                                    key={`GalleryImage-${index}`}
                                    className={styles.imageContainer} 
                                    style={{ width: imageWidth, height: isModal ? imageMaxHeight : 'auto' }}
                                >
                                    <Image 
                                        images={[image]} 
                                        className={styles.image} 
                                        style={{ maxHeight: isModal ? imageMaxHeight : 'auto' }} 
                                        fullscreenable={false}
                                    />
                                </span>
                            ))
                         }
                    </span>
                </span>

                <span className={`${styles.navButton} ${!canNavigate('right') && styles.disabled}`}>
                    <Button 
                        style={false}
                        icon={icon.chevronRight} 
                        disabled={!canNavigate('right')}
                        onClick={() => navigateDirection('right')} 
                    />
                </span>
            </div>

            <nav className={styles.navigation} ref={navigationRef}>
                <PreviewBar 
                    images={images}
                    navigateIndex={navigateIndex}
                    selectedIndex={selectedIndex}            
                />
            </nav>
        </div>    
    );
}
