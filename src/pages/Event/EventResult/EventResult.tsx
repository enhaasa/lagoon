/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './EventResult.module.scss';
import { useMemo, useLayoutEffect, useRef, useContext } from 'react';

// Contexts
import { UIContext } from '@contexts/UI';

// Utils
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Animations
import animate from '@utils/animate';

// Config
import location from '@config/location';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';
import Countdown from '@components/Countdown/Countdown';
import Location from '@components/Location/Location';
import EventFaq from './EventFaq/EventFaq';
import LocaleInfo from './LocaleInfo/LocaleInfo';
import ContentModal from '@components/Modal/ContentModal';
import Button from '@components/Button/Button';

// Icons
import icon from '@utils/icon';

type Event = {
    background: {
        sys: {id: string};
    },
    date: string;
    description: any;
    headline: string;
    subline: string;
    slug: string;
    dressCode?: string;
}

interface IEventResult {
    content: Event | null;
    assets: any;
}

export default function EventResult({ content, assets }: IEventResult) {
    const { modals } = useContext(UIContext);

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = animate.slideIn(ref, 'bottom', {fade: true})

        return () => {
            animation?.kill();
        }
    }, []);

    const date = new Date(content?.date ?? '');
    const formattedDate = date.toLocaleString().replace(',', ' at').slice(0, -3);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const background = useMemo(() => {
        if (!content?.background?.sys?.id) return null;

        return { src: assets[content.background.sys.id]?.file?.url };
    }, [ content, assets]);

    function onLocaleInfoClick() {
        modals.add(
            <ContentModal
                headline={'Locale Info'}
            >
                <LocaleInfo date={content?.date} />
            </ContentModal>
        )
    }

    return (
        <div className={styles.container} ref={ref}>

            <div className={styles.hero}>
                <div className={styles.image} style={{ backgroundImage: `url("${background?.src}")` }} />
                <div className={styles.content}>
                    {content &&
                        <>
                            <Title 
                                headline={content?.headline}
                                subline={content?.subline}
                                style={'handwritten'}
                                size={'xl'}
                                isCentered={true}
                            />

                            <div className={styles.separator} />
                            <div className={styles.infoWrapper}>

                                <div className={styles.countdown}>
                                    <div className={styles.title}>
                                        <Text>Event begins in</Text>
                                    </div>
                                    <Countdown date={content?.date} />
                                    <div className={styles.date}>
                                        <Text>{formattedDate}</Text>

                                        <div className={styles.timezone}>
                                            <Text>({userTimezone})</Text>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.location}>
                                    <Location
                                        server={location.server}
                                        area={location.area}
                                        ward={location.ward}
                                        plot={location.plot}
                                        closestAetheryte={location.closestAetheryte}
                                    />
                                </div>
                            </div>
                            <div className={styles.separator} />

                            <div className={styles.description}>
                                <Text>
                                    {documentToReactComponents(content?.description)}
                                </Text>
                            </div>
                        </>
                    }
                </div>
            </div>

            <EventFaq dressCode={content?.dressCode} />
        </div>    
    );
}
