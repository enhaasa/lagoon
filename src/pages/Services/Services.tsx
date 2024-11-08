/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Services.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useContext } from 'react';

// Contextsw
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Highlight from '@components/Highlight/Highlight';
import Title from '@components/Title/Title';

export default function Services() {
    const { services } = useContext(CMSContext);

    return (
        <Page>
            <div className={styles.container}>
                
                <div className={styles.teaser}>
                    <div className={styles.headline}>
                        <Title
                            headline={services?.content?.headline}
                            size='lg'
                            style='handwritten'
                            isCentered={true}
                        />
                    </div>
                </div>

                <div className={styles.services}>
                    {
                        services?.content?.services.map((highlight: any) => (
                            <Highlight 
                                key={highlight.internalName}
                                images={highlight.imageGallery.map((img: any) => ({src: img?.file?.url}))}
                                headline={highlight.headline}
                                subline={highlight.subline}
                                text={documentToReactComponents(highlight.text)}
                            />
                        ))
                    }
                </div>

            </div>
        </Page>    
    );
}
