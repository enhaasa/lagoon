import styles from './ConfirmDeleteEventModal.module.scss';
import { useContext } from 'react';

// Components
import Text from '@components/Text/Text';
import Button from '@components/Button/Button';
import ContentModal from '@components/Modal/ContentModal';

// Contexts
import { UIContext } from '@contexts/UI';
import { PageContext } from '@contexts/Page';

// Types
import { Event } from '@pages/Event/EventResult/EventResult';

// Utils
import LocalStorage from '@utils/localstorage';

export interface IConfirmDeleteEventModal {
    id?: number;
    event?: Event;
    headline: string;
}

export default function ConfirmDeleteEventModal({ headline, event, id }: IConfirmDeleteEventModal) {
    
    const { modals } = useContext(UIContext);
    const { storedEvents } = useContext(PageContext);

    function handleDelete() {
        if (!event) return;

        modals.closeCurrent();
        
        const updatedEvents = LocalStorage.removeEventById(event?.id as string);
        storedEvents.setEvents(updatedEvents);
    }

    function handleClose() {
        modals.closeCurrent();
    }

    return (
        <ContentModal
            id={id}
            headline={headline}
        >
            <div className={styles.container}>
                <div className={styles.message}>
                    <Text>
                        Are you sure you want to forget "{event?.headline}"?
                    </Text>
                </div>

                <nav className={styles.navigation}>
                    <Button
                        name='Yes, forget this event'
                        onClick={handleDelete}
                    />

                    <div className={styles.no}>
                        <Button
                            name='No'
                            style={false}
                            onClick={handleClose}
                        />
                    </div>
                </nav>
            </div>            
        </ContentModal>
    )
}
