import styles from './Spinner.module.scss';

// Icons
import animatedIcon from '@utils/animatedIcon';

export default function Spinner() {

    return (
        <div className={styles.container}>
            <img className={styles.spin} src={animatedIcon.spinner} />
        </div>    
    );
}
