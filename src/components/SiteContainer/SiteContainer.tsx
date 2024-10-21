import styles from './SiteContainer.module.scss';

interface ISiteContainer {
    children?: React.ReactNode;
}

export default function SiteContainer({ children }: ISiteContainer) {

    return (
        <div className={styles.container}>
            { children }
        </div>    
    );
}
