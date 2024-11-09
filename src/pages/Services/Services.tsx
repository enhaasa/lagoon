/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Services.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useContext, useState, useMemo, useRef } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Highlight from '@components/Highlight/Highlight';
import Title from '@components/Title/Title';
import Text from '@components/Text/Text';
import Switch from '@components/Switch/Switch';
import Separator from '@components/Separator/Separator';

// Animations
import gsap from 'gsap';

const DEFAULT_SHOW_NSFW = false;

export default function Services() {
    const { services } = useContext(CMSContext);
    const [ showNsfw, setShowNsfw ] = useState(false);

    const ref = useRef(null);

    const filteredHighlights = useMemo(() => {
        if (!services?.content?.services) return []; 
    
        return services.content.services.filter((highlight: any) => {
            if (!showNsfw) return !highlight.isNsfw;
    
            return true; 
        });
    }, [showNsfw, services]);

    function onFilterChange(state: boolean) {
        gsap.to(ref.current, { y: '100px', opacity: 0 });

        setTimeout(() => {
            setShowNsfw(state);
            gsap.to(ref.current, { y: 0, opacity: 1 });
        }, 500);
    }

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <div className={styles.headline}>
                        <Text >Filters</Text>
                    </div>
                    <nav className={styles.nav}>
                        <Switch
                            title='Show NSFW'
                            initState={DEFAULT_SHOW_NSFW}
                            callback={onFilterChange}
                        />
                    </nav>
                </div>

                <div className={styles.services} ref={ref}>
                    {
                        filteredHighlights.map((highlight: any) => ( 
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
