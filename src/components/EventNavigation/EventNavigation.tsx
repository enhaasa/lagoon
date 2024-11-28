import styles from './EventNavigation.module.scss';
import { useContext, useState, useRef } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';
import { UIContext } from '@contexts/UI';

// Components
import EventList from './EventList/EventList';
import LinkButton from '@components/LinkButton/LinkButton';
import ConfirmDeleteEventModal from './ConfirmDeleteEventModal/ConfirmDeleteEventModal';

// Icons
import icon from '@utils/icon';

// Types
import { Event } from '@pages/Event/EventResult/EventResult';

// Animations
import gsap from 'gsap';

export default function EventNavigation() {
    const { storedEvents, navigator } = useContext(PageContext);
    const { modals } = useContext(UIContext);

    const eventListRef = useRef(null);

    const [ eventListOpen, setEventListOpen ] = useState(false);

    function handleToggleEventList() {
        animateAndToggleEventList(!eventListOpen);
    }

    function animateAndToggleEventList(targetState: boolean) {
        console.log(eventListRef)
        if (!eventListRef.current) return;

        if (targetState) {
            toggleEventList(true);
            gsap.fromTo(eventListRef.current, 
                { y: '-20px', opacity: 0 }, 
                { y: 0, opacity: 1 }
            );
        } else {
            gsap.fromTo(eventListRef.current, 
                { y: 0, opacity: 1 }, 
                { y: '-20px', opacity: 0, onComplete: () => {toggleEventList(false)} }
            );
        }
    }

    function toggleEventList(targetState: boolean) {
        setEventListOpen(targetState);
    }

    function closeEventList() {
        animateAndToggleEventList(false);
    }

    function handleDeleteEvent(event: Event) {
        modals.add(
            <ConfirmDeleteEventModal 
                headline='Are you sure?'
                event={event}
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
                                isActive={_getIsCurrentPathByIndex(`/e/${storedEvents?.events?.[0]?.slug}`)}
                                callback={closeEventList}
                            />

                            <img 
                                draggable={false}
                                src={icon.trash} 
                                onClick={() => {handleDeleteEvent(storedEvents?.events?.[0])}} 
                                className={styles.trashButton}
                            />

                            {storedEvents?.events?.length > 1 &&
                                <img 
                                    draggable={false}
                                    src={icon.chevronDown} 
                                    onClick={handleToggleEventList} 
                                    className={`${styles.toggleEventsButton} ${eventListOpen && styles.turned}`}
                                />
                            }
                        </div>
                        
                            <div ref={eventListRef} className={styles.eventlist}>
                                {eventListOpen &&
                                    <EventList 
                                        events={storedEvents.events.filter((_, index) => index !== 0)} 
                                        closeEventList={closeEventList} 
                                        handleDeleteEvent={handleDeleteEvent}
                                    />
                                }
                            </div>
                        
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
