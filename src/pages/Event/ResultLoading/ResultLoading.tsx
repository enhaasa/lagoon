import styles from './ResultLoading.module.scss';

// Components
import Spinner from '@components/Spinner/Spinner';

export default function ResultLoading() {

    return (
        <div className={styles.container}>
            <Spinner />
        </div>    
    );
}
