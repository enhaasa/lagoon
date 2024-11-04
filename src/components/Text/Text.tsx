import styles from './Text.module.scss';

interface IText {
    children?: React.ReactNode;
    string?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export default function Text({ children, string, size = 'md' }: IText) {

    return (
        <div className={`${styles.container} ${styles[size]}`}>
            { string }
            { children }
        </div>    
    );
}
