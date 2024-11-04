import styles from './VenueDetails.module.scss';

// Config
import venueDetails from '@config/venueDetails';

// Components
import Text from '@components/Text/Text';

export default function VenueDetails() {

    return (
        <div className={styles.container}>
            {
                venueDetails.map(item => (
                    <div className={styles.item}>
                        <div className={styles.title}>
                           <Text size='sm'>{item.title}</Text>
                        </div>

                        <div className={styles.content}>
                            <Text>{item.content}</Text>
                        </div>
                    </div>
                ))
            }
        </div>    
    );
}
