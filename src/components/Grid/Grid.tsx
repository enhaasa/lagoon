import styles from './Grid.module.scss';

interface IColumn {
    children?: React.ReactNode;
}

export default function Grid({ children }: IColumn) {

    return (
        <div className={styles.container}>
            {children}
        </div>    
    );
}
