import styles from './EventFaq.module.scss';

// Import 
import Text from '@components/Text/Text';

// Config
import eventFaq from '@config/eventFaq';

interface IEventFaq {
    dressCode?: string;
}

export default function EventFaq({dressCode}: IEventFaq) {

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.question}>
                    <Text>Is there a dress code?</Text>
                </div>
                <div className={styles.answer}>
                    <Text>
                        {dressCode ?? 'No, this event has no special dress code. Come as you are!'}
                    </Text>
                </div>
            </div>
            {
                eventFaq.map((item, index) => (
                    <div className={styles.item} key={`EventFaqItem-${index}`}>
                        <div className={styles.question}>
                            <Text>{item.question}</Text>
                        </div>

                        <div className={styles.answer}>
                            <Text>{item.answer}</Text>
                        </div>
                    </div>
                ))
            }
        </div>    
    );
}
