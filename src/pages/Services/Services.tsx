/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Services.module.scss';
import { useContext, useState, useMemo, useRef } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Text from '@components/Text/Text';
import Switch from '@components/Switch/Switch';
import InfoCard from '@components/InfoCard/InfoCard';
import Grid from '@components/Grid/Grid';
import ChainSpawn from '@components/ChainSpawn/ChainSpawn';
import Title from '@components/Title/Title';
import Separator from '@components/Separator/Separator';

// Animations
import gsap from 'gsap';

const DEFAULT_SHOW_NSFW = false;

export default function Services() {
    const { services } = useContext(CMSContext);
    const [ showNsfw, setShowNsfw ] = useState(false);

    const ref = useRef(null);

    const filteredIncludedServices = useMemo(() => {
        if (!services?.content?.includedServices) return []; 
    
        return services.content.includedServices.filter((service: any) => {
            if (!showNsfw) return !service.isNsfw;
    
            return true; 
        });
    }, [showNsfw, services?.content?.includedServices]);

    const filteredPaidServices = useMemo(() => {
        if (!services?.content?.paidServices) return []; 
    
        return services.content.paidServices.filter((service: any) => {
            if (!showNsfw) return !service.isNsfw;
    
            return true; 
        });
    }, [showNsfw, services?.content?.paidServices]);

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

                <div className={styles.title}>
                    <Title 
                        headline={services?.content?.headline}
                        size='xl'
                        style='handwritten'
                        isCentered={true}
                    />
                </div>

                <Separator />

                <div className={styles.services} ref={ref}>

                    {filteredIncludedServices.length > 0 &&
                        <>
                            <div className={styles.serviceTitle}>
                                <Title headline='Included Services' isCentered={true} />
                            </div>

                            <Grid>
                                <ChainSpawn items={filteredIncludedServices.map((service: any) => 
                                    <InfoCard 
                                        title={service.headline} 
                                        background={service.background}
                                        description={service.description}
                                    />
                                )} />
                            </Grid>
                        </>
                    }

                    {filteredPaidServices.length > 0 &&
                        <>
                            <div className={styles.serviceTitle}>
                                <Title headline='Paid Services' isCentered={true} />
                            </div>
                            
                            <Grid>
                                <ChainSpawn items={filteredPaidServices.map((service: any) => 
                                    <InfoCard 
                                        title={service.headline} 
                                        background={service.background}
                                        description={service.description}
                                    />
                                )} />
                            </Grid>
                        </>
                    }

                </div>

            </div>
        </Page>    
    );
}
