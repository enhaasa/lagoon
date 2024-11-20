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

    return (
        <div className={`${styles.container} ${isSelected && styles.selected}`} onClick={() => {selectCategory(title)}}>
            <Text>{title} ({count})</Text>
        </div>    
    );
}
