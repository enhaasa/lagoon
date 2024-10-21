/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
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
    style?: any;
}

const Image = forwardRef<HTMLImageElement, IImage>(
    ({ src, fullscreenable = true, rounded = true, className, style }: IImage, ref) => {
        const navigator = useNavigation();

        function onFullscreen() {
            navigator.externalNavigate(src, true);
        }

        return (
            <div className={styles.container}>
                <img 
                    src={src} 
                    className={`${styles.image} ${rounded ? styles.rounded : ''} ${className ? className : ''}`} 
                    style={style}
                    draggable={false} 
                    ref={ref}
                />

                {fullscreenable &&
                    <div className={styles.overlay}>
                        <Button 
                            style={false}
                                icon={icon.externalLink}                  
                            onClick={onFullscreen}
                        />
                    </div>
                }
            </div>    
        );
    }
);

Image.displayName = 'Image';

export default Image;
