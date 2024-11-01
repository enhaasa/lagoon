/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import styles from './TheVenue.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Location from '@components/Location/Location';
import ImageGalleryButton from '@components/ImageGalleryButton/ImageGalleryButton';
import Highlight from '@components/Highlight/Highlight';

// Images
import venueImg1 from '@assets/images/lagoon1.png';
import venueImg2 from '@assets/images/lagoon2.png';
import venueImg3 from '@assets/images/lucy.jpg';

const venueImages = [
    {src: venueImg1},
    {src: venueImg2},
    {src: venueImg3}
];

export default function TheVenue() {
    const { venue } = useContext(CMSContext);

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <Location 
                        server={'Odin'}
                        area={'The Goblet'}
                        ward={27}
                        plot={19}
                        closestAetheryte='The Brimming Heart'
                    />
                
                    <ImageGalleryButton 
                        images={venueImages}
                    />
                </div>

                {
                    venue?.content?.highlights.map((highlight: any) => (
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
        </Page>
    );
}