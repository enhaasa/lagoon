import styles from './EventNavigation.module.scss';
import { useContext, useState, useMemo } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';

// Components
import EventList from './EventList/EventList';
import LinkButton from '@components/LinkButton/LinkButton';

// Icons
import icon from '@utils/icon';


export default function EventNavigation() {
    const { storedEvents, navigator } = useContext(PageContext);
    const [ eventListOpen, setEventListOpen ] = useState(false);

    function handleToggleEventList() {
        setEventListOpen(prev => !prev);
    }

    function closeEventList() {
        setEventListOpen(false);
    }

    return (
        <div className={styles.container}>
            {storedEvents?.events?.length &&
                <>
                    <div className={styles.button}>
                        <LinkButton 
                            name={storedEvents?.events?.[0]?.headline}
                            target={`/e/${storedEvents?.events?.[0]?.slug}`}
                            isUnderlined={true}
                            isActive={_getIsCurrentPathByIndex(`/e/${storedEvents?.events?.[0]?.slug}`)}
                            callback={closeEventList}
                        />

                        {storedEvents?.events?.length > 1 &&
                            <img 
                                src={icon.chevronDown} 
                                onClick={handleToggleEventList} 
                                className={styles.toggleEventsButton}
                            />
                        }

                        {eventListOpen &&
                            <div className={styles.eventlist}>
                                <EventList events={storedEvents.events.filter((_, index) => index !== 0)} closeEventList={closeEventList} />
                            </div>
                        }
                    </div>
                </>
            }
        </div>    
    );

    function _getIsCurrentPathByIndex(path: string) {
        if (!navigator) return false;

        const result = (navigator.currentPageIndex.get === navigator.getPageIndexByPath(path));

        return result;
    }
}
