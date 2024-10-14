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
    className?: string;
}

export default function Image({ src, fullscreenable = true, rounded = true, className }: IImage) {
    const navigator = useNavigation();

    function onFullscreen() {
        navigator.externalNavigate(src, true);
    }

    return (
        <div className={styles.container}>
            <img 
                src={src} 
                className={`${styles.image} ${rounded ? styles.rounded : ''} ${className ? className : ''}`} 
                draggable={false} 
            />

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
