import styles from './MenuList.module.scss';
import { useContext, useState, useEffect, useRef } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import Category from './Category/Category';
import DiningItem from './DiningItem/DiningItem';
import ChainFadeIn from '@components/ChainFadeIn/ChainFadeIn';

// Animations
import animate from '@utils/animate';


export default function MenuList() {
    const { menu: categories } = useContext(KiwiContext);
    const [ selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
            <nav className={styles.nav}>
                {Object.keys(categories ?? {}).map((category, index) => (
                    <>
                        <Category 
                            title={category} 
                            count={categories?.[category].length} 
                            key={`MenuListCategory-${index}`} 
                            isSelected={selectedCategory === category}
                            selectCategory={selectCategory}
                        />

  
                    </>
                ))}
            </nav>

            <div className={styles.results} ref={resultsRef}>
                {selectedCategory &&
                    <ChainFadeIn
                        items={categories?.[selectedCategory]?.map(item => <DiningItem item={item} />)}
        
                    />
                }
            </div>
            

        </div>    
    );
}
