import styles from './NoResult.module.scss';

// Components
import Text from '@components/Text/Text';

export default function NoResult() {

    return (
        <div className={styles.container}>
            <Text>Hmm, it seems this event has expired...</Text>
        </div>    
    );
}
