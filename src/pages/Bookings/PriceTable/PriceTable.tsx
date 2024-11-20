/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './PriceTable.module.scss';
import { useContext, useState, useMemo } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';
import Switch from '@components/Switch/Switch';
import ChainFadeIn from '@components/ChainFadeIn/ChainFadeIn';

// Utils
import { parseCmsPrice } from '@utils/prices';

const DEFAULT_SHOW_NSFW = false;

export default function PriceTable() {
    const { services } = useContext(CMSContext);

    const [ showNsfw, setShowNsfw ] = useState(DEFAULT_SHOW_NSFW);

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
        setShowNsfw(state);
    }

    return (
        <div className={styles.container}>

                <div className={styles.teaser}>
                    <nav className={styles.nav}>
                        <Switch
                            title='Show NSFW'
                            initState={DEFAULT_SHOW_NSFW}
                            callback={onFilterChange}
                        />
                    </nav>
                </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <Title headline='Included' />
                </div>
                <div className={styles.table}>
                    <ChainFadeIn
                        items={filteredIncludedServices.map((service: any, index: number) => (
                            <div className={styles.row} key={`PriceTableIncludedService-${index}`}>
                                <span className={styles.name}>
                                    <Text>{service.headline}</Text>
                                </span>

                                <span className={styles.separator} />

                                <span className={styles.included}>
                                    <Text>Free</Text>
                                </span>
                            </div>
                        ))}
                    />
                </div>              
            </div>

            <div className={styles.row}>
                <div className={styles.title}>
                    <Title headline='Additions' />
                </div>

                <div className={styles.table}>
                    <ChainFadeIn
                        items={filteredPaidServices.map((service: any, index: number) => (
                            <div className={styles.row} key={`PriceTablePaidService-${index}`}>
                                <span className={styles.name}>
                                    <Text>{service.headline}</Text>
                                </span>

                                <span className={styles.separator} />

                                <span className={styles.amount}>
                                    <Text>{parseCmsPrice(service?.price)}</Text>
                                </span>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </div>    
    );
}
