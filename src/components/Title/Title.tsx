import styles from './Title.module.scss';

interface ITitle {
    headline: string;
    subline?: string;
}

export default function Title({ headline, subline }: ITitle) {

    return (
        <div className={styles.container}>
            <h1 className={styles.headline}>
                { headline }
            </h1>
            {subline &&
                <h3 className={styles.subline}>
                    {subline}
                </h3>
            }
        </div>    
    );
}
