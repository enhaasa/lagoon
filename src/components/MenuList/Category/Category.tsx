import styles from './Category.module.scss';

// Types
import { TDiningItem } from '@enhasa/kiwicore';

// Components
import Text from '@components/Text/Text';

interface ICategory {
    title?: string;
    count?: number;
    isSelected: boolean;
    selectCategory: (category?: string) => void;
}

export default function Category({ 
    title, 
    count, 
    isSelected, 
    selectCategory 
}: ICategory) {

    function handleClick() {
        if (!isSelected) {
            selectCategory(title);
        }
    }

    return (
        <div className={`${styles.container} ${isSelected && styles.selected}`} onClick={handleClick}>
            <div className={styles.title}>
                <Text size='lg'>{title}</Text>
            </div>
        </div>    
    );
}
