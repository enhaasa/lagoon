/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './EventResult.module.scss';
import { useMemo, useLayoutEffect, useRef } from 'react';

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

type Event = {
    background: {
        sys: {id: string};
    },
    date: string;
    description: any;
    headline: string;
    subline: string;
    slug: string;
}

interface IEventResult {
    content: Event | null;
    assets: any;
}

export default function EventResult({ content, assets }: IEventResult) {

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = animate.slideIn(ref, 'bottom', {fade: true})

        return () => {
            animation?.kill();
        }
    }, []);

    const background = useMemo(() => {
        if (!content?.background?.sys?.id) return null;

        return { src: assets[content.background.sys.id]?.file?.url };
    }, [ content, assets]);

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

                            <div className={styles.infoWrapper}>
                                <div className={styles.countdown}>
                                    <div className={styles.title}>
                                        <Text>Event begins in</Text>
                                    </div>
                                    <Countdown date={content?.date} />
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
                        </>
                    }
                </div>
            </div>

            <Text>
                {documentToReactComponents(content?.description)}
            </Text>

        </div>    
    );
}
