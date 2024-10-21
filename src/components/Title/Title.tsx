import styles from './Title.module.scss';

interface ITitle {
    headline: string;
    subline?: string;
    size?: 'lg' | 'xl' | 'xxl';
}

export default function Title({ headline, subline, size = 'lg' }: ITitle) {

    return (
        <div className={styles.container}>
            <h1 className={`${styles.headline} ${styles[size]}`}>
                { headline }
            </h1>

            {subline &&
                <h3 className={styles.subline}>
                    { subline }
                </h3>
            }
        </div>    
    );
}
