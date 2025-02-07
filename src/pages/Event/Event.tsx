/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Event.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// Contexts
import { CMSContext, ContentfulEvent } from '@contexts/CMS';

// Components
import EventResult from './EventResult/EventResult';
import NoResult from './NoResult/NoResult';
import ResultLoading from './ResultLoading/ResultLoading';
import Page from '@components/Page/Page';

// Types
import type { Event as EventType } from '@pages/Event/EventResult/EventResult';

interface IEvent {
    manualSlug?: string;
}

export default function Event({ manualSlug }: IEvent) {
    const { events } = useContext(CMSContext);
    const { slug } = useParams();

    const [ content, setContent ] = useState<null | EventType>(null);
    const [ noresult, setNoresult ] = useState(false);

    useEffect(() => {
        const slugToUse = manualSlug ?? slug;

        if (!slugToUse) return;
        setContent(null);

        const event: undefined | ContentfulEvent = events?.find(e => e.slug === slugToUse);

        if (!events) {
            return;
        }

        if (event) {
            setContent(event);
        } else {
            setNoresult(true);
        }
    }, [ manualSlug, slug, events ]);

    return (
        <Page>
            <div className={styles.container}>
                {
                    content && !noresult 
                    ? <EventResult event={content} />
                    : !noresult 
                    ? <ResultLoading />
                    : <NoResult text='Hmm, it seems this event has expired...' />
                }
            </div>    
        </Page>
    );    
}
