import styles from './EventNavigation.module.scss';
import { useContext, useState } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';
import { UIContext } from '@contexts/UI';

// Components
import EventList from './EventList/EventList';
import LinkButton from '@components/LinkButton/LinkButton';
import ConfirmDeleteEventModal from './ConfirmDeleteEventModal/ConfirmDeleteEventModal';

// Icons
import icon from '@utils/icon';

export default function EventNavigation() {
    const { storedEvents, navigator } = useContext(PageContext);
    const { modals } = useContext(UIContext);

    const [ eventListOpen, setEventListOpen ] = useState(false);

    function handleToggleEventList() {
        setEventListOpen(prev => !prev);
    }

    function closeEventList() {
        setEventListOpen(false);
    }

    function handleDeleteEvent() {
        modals.add(
        <ConfirmDeleteEventModal 
            headline='Are you sure?'
            event={storedEvents?.events?.[0]}
        />
    );
    }

    return (
        <div className={styles.container}>
            {storedEvents?.events?.length > 0 &&
                <>
                    <div className={styles.buttonWrapper}>
                        <div className={styles.button}>
                            <LinkButton 
                                name={storedEvents?.events?.[0]?.headline}
                                target={`/e/${storedEvents?.events?.[0]?.slug}`}
                                isUnderlined={true}
                                isActive={_getIsCurrentPathByIndex(`/e/${storedEvents?.events?.[0]?.slug}`)}
                                callback={closeEventList}
                            />

                            <img 
                                draggable={false}
                                src={icon.trash} 
                                onClick={handleDeleteEvent} 
                                className={styles.trashButton}
                            />

                            {storedEvents?.events?.length > 1 &&
                                <img 
                                    draggable={false}
                                    src={icon.chevronDown} 
                                    onClick={handleToggleEventList} 
                                    className={styles.toggleEventsButton}
                                />
                            }
                        </div>

                        {eventListOpen &&
                            <div className={styles.eventlist}>
                                <EventList 
                                    events={storedEvents.events.filter((_, index) => index !== 0)} 
                                    closeEventList={closeEventList} 
                                    handleDeleteEvent={handleDeleteEvent}
                                />
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
