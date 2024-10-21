import styles from './PreviewBar.module.scss';
import { useMemo, useState, useEffect } from 'react';

// Components
import Image from '@components/Image/Image';

// Icons
import icon from '@utils/icon';

// Types
import { GalleryImage } from '../ImageGallery';
import Button from '@components/Button/Button';

const MAX_PREVIEWS_PER_PAGE = 4;

function paginateImages(images: GalleryImage[]) {
    let page = 0;
    let previewCounter = 0;

    const sortedArray = [];

    for (let i = 0; i < images.length; i++) {
        sortedArray.push({
            ...images[i],
            index: i,
            page,
        })
        
        previewCounter++;

        if (previewCounter === MAX_PREVIEWS_PER_PAGE) {
            previewCounter = 0;
            page++;
        }
    }

    return sortedArray;
}

interface IPreviewBar {
    images: GalleryImage[];
    navigateIndex: (T:number) => void;
    selectedIndex: number;
}

export default function PreviewBar({ 
    images,
    navigateIndex,
    selectedIndex
}: IPreviewBar) {
    const paginatedImages = useMemo(() => paginateImages(images), [images]);
    const pages = useMemo(() => Array.from(new Set(paginatedImages.map(page => page.page))), [paginatedImages]);
    const [ page, setPage ] = useState<number>(paginatedImages[selectedIndex].page);

    useEffect(() => {
        setPage(paginatedImages[selectedIndex].page);
    }, [ selectedIndex, paginatedImages ]);

    function canPageNavigate(direction: HorizontalDirection) {
        if (direction === 'left') {
            return (page !== 0);
        } else {
            return (pages.length !== page +1);
        }
    }

    function navigatePageDirection(direction: HorizontalDirection) {
        if (direction === 'left' && canPageNavigate('left')) {
            setPage(page -1);
        } else if (direction === 'right' && canPageNavigate('right')) {
            setPage(page +1);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.dotNav}>
                {
                    paginatedImages.map((image, index) => (
                        <button 
                            key={`PaginatedPreviewImage-${index}`}
                            className={`${styles.dot} ${image.index === selectedIndex ? styles.active : ''}`} 
                            onClick={() => navigateIndex(image.index)}
                        />
                    ))
                }
            </div>

            <div className={styles.imageNav}>
                <span className={`${styles.navButton} ${!canPageNavigate('left') && styles.disabled}`}>
                    <Button 
                        style={false}
                        size={'sm'}
                        icon={icon.chevronLeft} 
                        disabled={!canPageNavigate('left')}
                        onClick={() => navigatePageDirection('left')} 
                    />
                </span>
                {
                    paginatedImages.filter(i => i.page === page).map((image, index) => (

                        <span 
                            key={`PreviewImage-${index}`}
                            className={`
                                ${styles.item} ${image.index === selectedIndex ? styles.active : ''} 
                                ${image.index === 0 ? styles.first : ''}
                                ${image.index === paginatedImages.length -1 ? styles.last : ''}
                            `} 
                            onClick={() => navigateIndex(image.index)}
                        >
                            <Image 
                                className={styles.previewImage}
                                src={image.src} 
                                fullscreenable={false}
                                rounded={false}
                            />
                        </span>
                    ))
                }
                <span className={`${styles.navButton} ${!canPageNavigate('right') && styles.disabled}`}>
                    <Button 
                        style={false}
                        size={'sm'}
                        icon={icon.chevronRight} 
                        disabled={!canPageNavigate('right')}
                        onClick={() => navigatePageDirection('right')} 
                    /> 
                </span>
            </div>
        </div>    
    );
}
