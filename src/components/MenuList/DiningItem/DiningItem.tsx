import styles from './DiningItem.module.scss';

// Types
import { TDiningItem } from '@enhasa/kiwicore';

// Components
import Text from '@components/Text/Text';

interface IDiningItem {
    item?: TDiningItem;
}

export default function DiningItem({ item }: IDiningItem) {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Text size='lg'>{item?.name}</Text>

                <div className={styles.price}>
                    {/*<Text>{item?.price?.toLocaleString('en-US')} gil</Text>*/}
                </div>
            </div>
            
            <div className={styles.description}>
                <Text>{item?.description}</Text>
            </div>
            

        </div>    
    );
}
