import styles from './MenuList.module.scss';
import { useContext, useState, useEffect, useRef } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import DiningItem from './DiningItem/DiningItem';
import ChainFadeIn from '@components/ChainFadeIn/ChainFadeIn';
import Title from '@components/Title/Title';
import MultiToggle from '@components/MultiToggle/MultiToggle';

// Animations
import animate from '@utils/animate';
//import dining_icon from '@utils/dining_icon';

export default function MenuList() {
    const { menu } = useContext(KiwiContext);
    const [ selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { categories } = menu;

    const resultsRef = useRef(null);

    function selectCategory(category?: string) {
        if (!category || !resultsRef.current) return;

        animate.slideOut(resultsRef, 'bottom', {fade: true});
        
        setTimeout(() => {
            setSelectedCategory(category);
            animate.slideIn(resultsRef, 'bottom', {fade: true});
        }, 400);
    }

    useEffect(() => {
        if (!categories) return;
        setSelectedCategory(Object.keys(categories)[0]);
    }, [categories]);

    return (
        <div className={styles.container}>
            <div className={styles.navWrapper}>
                <MultiToggle 
                    options={Object.keys(categories ?? {})}
                    initSelected={selectedCategory ?? ''}
                    onSelect={selectCategory} 
                />
            </div>

            <div className={styles.results} ref={resultsRef}>
                <>
                    <div className={styles.title}>
                        <Title 
                            headline={selectedCategory ?? ''} 
                            isCentered={true}
                            style='handwritten' 
                        />
                    </div>
                    
                    {selectedCategory &&
                        <ChainFadeIn
                            items={categories?.[selectedCategory]?.map(item => <DiningItem item={item} />)}
                        />
                    }
                </>
            </div>
        </div>    
    );
}
