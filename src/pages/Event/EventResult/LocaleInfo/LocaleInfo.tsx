import styles from './LocaleInfo.module.scss';

interface ILocaleInfo {
    date?: string;
}

export default function LocaleInfo({ date }: ILocaleInfo) {

    console.log(date)

    return (
        <div className={styles.container}>

        </div>    
    );
}
