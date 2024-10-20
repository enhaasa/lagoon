import styles from './Row.module.scss';

interface IRow {
    children?: React.ReactNode;
}

export default function Row({ children }: IRow) {

    return (
        <div className={styles.container}>
            {children}
        </div>    
    );
}
