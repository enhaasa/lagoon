import styles from './Image.module.scss';

// Components
import Button from '@components/Button/Button';

// Icons
import icon from '@utils/icon';

// Utils
import useNavigation from '@hooks/useNavigation';

interface IImage {
    src: string;
    fullscreenable?: boolean;
    rounded?: boolean;
}

export default function Image({ src, fullscreenable = true, rounded = true }: IImage) {
    const navigator = useNavigation();

    function onFullscreen() {
        navigator.externalNavigate(src, true);
    }

    return (
        <div className={styles.container}>
            <img src={src} className={`${styles.image} ${rounded ? styles.rounded : ''}`} draggable={false} />

            {fullscreenable &&
                <div className={styles.overlay}>
                    <Button 
                        icon={icon.externalLink}                  
                        onClick={onFullscreen}
                    />
                </div>
            }
        </div>    
    );
}
