import styles from './Title.module.scss';

interface ITitle {
    headline: string;
    subline?: string;
    style?: 'standard' | 'handwritten';
    size?: 'lg' | 'xl' | 'xxl';
}

export default function Title({ headline, subline, size = 'lg', style = 'standard' }: ITitle) {

    return (
        <div className={styles.container}>
            <h1 className={`${styles.headline} ${styles[size]} ${styles[`font-${style}`]}`}>
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
