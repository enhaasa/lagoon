import styles from './TheVenue.module.scss';

// Components
import Page from '@components/Page/Page';
import Location from '@components/Location/Location';
import ImageGalleryButton from '@components/ImageGalleryButton/ImageGalleryButton';
import Highlight from '@components/Highlight/Highlight';

// Images
import venueImg1 from '@assets/images/lagoon1.png';
import venueImg2 from '@assets/images/lagoon2.png';
import venueImg3 from '@assets/images/lucy.jpg';

// Highlight images
import outsideImg from '@assets/images/outside.webp';

const venueImages = [
    {src: venueImg1},
    {src: venueImg2},
    {src: venueImg3}
];


export default function TheVenue() {

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

                <Highlight
                    images={[{src: outsideImg}]}
                    headline='The Location'
                    subline='A jewel in the center of The Goblet'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                />

                <Highlight
                    images={[{src: venueImg2}]}
                    headline='The Atmosphere'
                    subline='Warmth and intimacy'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                />
            </div>    
        </Page>
    );
}
