import styles from './Footer.module.scss';

import LinkButton from '@components/LinkButton/LinkButton';

export default function Footer() {

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <span>©2022-2024 Lagoon</span>
                <span>&bull;</span>
                <span>
                    Subvenue of &nbsp;
                    <LinkButton 
                        name="Coco's Oasis"
                        target="https://cocosoasis.info"
                        isExternalLink={true}
                        isNewTab={true}
                        isUnderlined={true}
                    />
                </span>

            </nav>
        </div>    
    );
}
