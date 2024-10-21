import styles from './Text.module.scss';

interface IText {
    children?: React.ReactNode;
    string?: string;
}

export default function Text({ children, string }: IText) {

    return (
        <div className={styles.container}>
            { string }
            { children }
        </div>    
    );
}
