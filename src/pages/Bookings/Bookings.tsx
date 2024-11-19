import styles from './Bookings.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';
import { PageContext } from '@contexts/Page';

// Components
import Page from '@components/Page/Page';
import Text from '@components/Text/Text';
import PriceTable from './PriceTable/PriceTable';
import Button from '@components/Button/Button';
import Title from '@components/Title/Title';
import LinkButton from '@components/LinkButton/LinkButton';
import Separator from '@components/Separator/Separator';

export default function Bookings() {

    const { bookings } = useContext(CMSContext);
    const { navigator } = useContext(PageContext);

    function handleDiscordClick() {
        navigator.externalNavigate(bookings?.content?.discordBookingLink, true);
    }

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <div className={styles.baseCost}>
                        <div className={styles.title}>
                            <Text size='sm'>
                                Base cost per hour:
                            </Text>
                        </div>

                        <Text>
                            {bookings?.content?.baseCost?.toLocaleString('en-US')} gil
                        </Text>
                    </div>

                    <Button 
                        name='Book through Discord' 
                        style='accent'
                        onClick={handleDiscordClick}
                    />
                </div>

                <div className={styles.content}>

                    <div className={styles.title}>

                        <Title headline='Ready to make your event unforgettable?' subline='' size='xl' />
                        <div className={styles.subline}>
                            <Text>
                                Head over to the
                                &#8203;<LinkButton 
                                    name= 'Oasis Discord' 
                                    target={bookings?.content?.discordBookingLink} 
                                    isUnderlined={true} 
                                    isNewTab={true} 
                                />&#8203;
                                and open a new event ticket!
                            </Text>
                        </div>
                    </div>

                    <Separator />

                    <PriceTable />

                </div>
            </div>
        </Page>    
    );
}
