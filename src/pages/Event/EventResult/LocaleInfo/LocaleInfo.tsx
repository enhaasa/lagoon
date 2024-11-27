import styles from './LocaleInfo.module.scss';

interface ILocaleInfo {
    date?: string;
}

export default function LocaleInfo({ }: ILocaleInfo) {

    return (
        <div className={styles.container}>

        </div>    
    );
}
