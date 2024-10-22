import styles from './Footer.module.scss';

// Components
import LinkButton from '@components/LinkButton/LinkButton';
import Text from '@components/Text/Text';

export default function Footer() {

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <span><Text>©2022-2024 Lagoon</Text></span>
                <span>&bull;</span>
                <span>
                    <Text>Subvenue of</Text> &nbsp;
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
