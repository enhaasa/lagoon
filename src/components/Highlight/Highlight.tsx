import styles from './Highlight.module.scss';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';
import Image from '@components/Image/Image';

interface IHighlight {
    headline: string;
    subline?: string;
    text?: string | React.ReactNode;
    images: {src: string}[];
}

export default function Highlight({ headline, subline, text, images }: IHighlight) {

    return (
        <div className={styles.container}>
            <div className={`${styles.textContainer} ${styles.column}`}>
                <Title headline={headline} subline={subline} size={'xl'} style='handwritten' />
                <div className={styles.text}>
                    <Text>
                        {text}
                    </Text>
                </div>
            </div>

            <div className={`${styles.image} ${styles.column}`}>
                {
                    <Image images={images}/> 
                }
            </div>
        </div>    
    );
}
