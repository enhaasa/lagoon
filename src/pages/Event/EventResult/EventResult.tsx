/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './EventResult.module.scss';
import { useState, useLayoutEffect, useRef, useEffect, useContext } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';

// Animations
import animate from '@utils/animate';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';
import Countdown from '@components/Countdown/Countdown';
import LagoonLocation from '@components/Location/LagoonLocation/LagoonLocation';
import EventFaq from './EventFaq/EventFaq';
import Separator from '@components/Separator/Separator';
import MultiToggle from '@components/MultiToggle/MultiToggle';
import RichTextRenderer from '@components/RichTextRenderer';

// Utils
import icon from '@utils/icon';
import LocalStorage from '@utils/localstorage';
import { getLocalTimeOnly, getServerTimeOnly } from '@utils/time';

type Timezone = 'Local Time' | 'Server Time';

export type Event = {
    id: number | string;
    background: {
        sys: {id: string};
    },
    startTime: string,
    endTime: string,
    description: any;
    headline: string;
    subline: string;
    slug: string;
    dressCode?: string;
}

interface IEventResult {
    event: any | null;
}

export default function EventResult({ event }: IEventResult) {
    const [ timezone, setTimezone ] = useState<Timezone>('Local Time');
    const { storedEvents } = useContext(PageContext);

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = animate.slideIn(ref, 'bottom', {fade: true})

        return () => {
            animation?.kill();
        }
    }, []);

    useEffect(() => {
        if (!event || !storedEvents) return;

        const newEvents = LocalStorage.addToEvents(event);

        if (newEvents) {
            storedEvents.setEvents(newEvents);
        }
        
    }, [ event ]);

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.hero}>
                <div className={styles.image} style={{ backgroundImage: `url("${event?.background}")` }} />
                <div className={styles.content}>
                    {event &&
                        <>
                            <Title 
                                headline={event?.headline}
                                subline={event?.subline}
                                style={'handwritten'}
                                size={'xl'}
                                isCentered={true}
                            />

                            <Separator />
                            <div className={styles.infoWrapper}>

                                <div className={styles.location}>
                                    <LagoonLocation isCentered={true} />
                                </div>

                                <div className={styles.countdown}>
                                    <div className={styles.title}>
                                        <Text size='sm'>Event begins in</Text>
                                    </div>
                                    <Countdown date={event?.startTime} />
                                    
                                    <div className={styles.date}>
                                        <div className={styles.timeunit}>
                                            <img src={icon.calendar} />
                                            <Text>
                                                {timezone === 'Local Time' 
                                                    ? event?.local_start_time.time
                                                    : event?.server_start_time
                                                }
                                            </Text>
                                        </div>

                                        <div className={styles.timeunit}>
                                            <img src={icon.clock} />
                                            <Text>
                                                {timezone === 'Local Time' 
                                                    ? `${getLocalTimeOnly(event?.raw_start_time)} - ${getLocalTimeOnly(event?.raw_end_time)}`
                                                    : `${getServerTimeOnly(event?.raw_start_time)} - ${getServerTimeOnly(event?.raw_end_time) }`
                                                }
                                            </Text>
                                        </div>

                                        <div className={styles.timezone}>  
                                            <MultiToggle 
                                                options={['Local Time', 'Server Time']} 
                                                initSelected='Local Time'
                                                onSelect={(timezone: string) => {setTimezone(timezone as Timezone)}} 
                                                activeColor='blue'
                                                size='xs' 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className={styles.description}>
                                <RichTextRenderer richTextDocument={event?.description} />
                            </div>
                        </>
                    }
                </div>
            </div>

            <EventFaq dressCode={event?.dressCode} />
        </div>    
    );
}
