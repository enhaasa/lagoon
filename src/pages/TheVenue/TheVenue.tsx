/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import styles from './TheVenue.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Config
import location from '@config/location';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Location from '@components/Location/Location';
import Highlight from '@components/Highlight/Highlight';
import VenueDetails from '@components/VenueDetails/VenueDetails';

export default function TheVenue() {
    const { venue } = useContext(CMSContext);

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <Location
                        server={location.server}
                        area={location.area}
                        ward={location.ward}
                        plot={location.plot}
                        closestAetheryte={location.closestAetheryte}
                    />
                
                    <VenueDetails />
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