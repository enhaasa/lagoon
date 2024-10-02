import styles from './Column.module.scss';

interface IColumn {
    children?: React.ReactNode;
}

export default function Column({ children }: IColumn) {

    return (
        <div className={styles.container}>
            {children}
        </div>    
    );
}
