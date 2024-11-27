import styles from './EventList.module.scss';

// Components
import LinkButton from '@components/LinkButton/LinkButton';

// Types
import { Event } from '@pages/Event/EventResult/EventResult';

// Icons
import icon from '@utils/icon';

interface IEventList {
    events?: Event[];
    closeEventList: () => void;
    handleDeleteEvent: (event: Event) => void;
}

export default function EventList({ events = [], closeEventList, handleDeleteEvent }: IEventList) {
    return (
        <div className={styles.container}>
            {Array.isArray(events) && events?.map((event, index) => (
                <div className={styles.link} key={`EventListItem-${index}`}>
                    <LinkButton 
                        name={event?.headline}
                        target={`/e/${event?.slug}`}
                        size='sm'
                        callback={closeEventList}
                    />
                    
                    <img 
                        draggable={false}
                        src={icon.trash} 
                        onClick={() => {handleDeleteEvent(event)}} 
                        className={styles.trashButton}
                    />
                </div>
            ))}
        </div>    
    );
}
