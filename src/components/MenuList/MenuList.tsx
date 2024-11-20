import styles from './MenuList.module.scss';
import { useContext, useState, useEffect } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import Category from './Category/Category';


export default function MenuList() {
    const { menu: categories } = useContext(KiwiContext);
    const [ selectedCategory, setSelectedCategory] = useState<string | null>(null);

    function selectCategory(category?: string) {
        if (!category) return;

        setSelectedCategory(category);
    }

    useEffect(() => {
        if (!categories) return;
        setSelectedCategory(Object.keys(categories)[0]);
    }, [categories]);


    return (
        <div className={styles.container}>

            <nav className={styles.nav}>
                {Object.keys(categories ?? {}).map((category, index) => (
                    <Category 
                        title={category} 
                        count={categories?.[category].length} 
                        key={`MenuListCategory-${index}`} 
                        isSelected={selectedCategory === category}
                        selectCategory={selectCategory}
                    />
                ))}
            </nav>
            

        </div>    
    );
}
