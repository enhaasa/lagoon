import styles from './Title.module.scss';

// Components
import Text from '@components/Text/Text';

interface ITitle {
    headline: string;
    subline?: string;
    style?: 'standard' | 'handwritten';
    size?: 'lg' | 'xl' | 'xxl';
    isCentered?: boolean;
}

export default function Title({ headline, subline, size = 'lg', style = 'standard', isCentered = false }: ITitle) {

    return (
        <div className={`${styles.container} ${isCentered ? styles.centered : ''}`}>
            <h1 className={`${styles.headline} ${styles[size]} ${styles[`font-${style}`]}`}>
                { headline }
            </h1>

            {subline &&
                <h3 className={styles.subline}>
                    <Text>{ subline }</Text>
                </h3>
            }
        </div>    
    );
}
