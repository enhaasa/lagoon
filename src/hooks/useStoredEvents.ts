import { useEffect, useState } from "react";

// Utils
import LocalStorage from "@utils/localstorage";

// Types
import { Event } from "@pages/Event/EventResult/EventResult";

export interface IUseStoredEvents {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export default function useStoredEvents() {
    const [ events, setEvents ] = useState<Event[]>([]);

    useEffect(() => {
        const storedEvents = LocalStorage.getEvents();

        setEvents(storedEvents);
    }, []);

    return {
        events,
        setEvents
    }
}