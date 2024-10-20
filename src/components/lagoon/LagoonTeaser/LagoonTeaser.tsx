import styles from './LagoonTeaser.module.scss';
import { useState, useLayoutEffect, useRef } from 'react';

// Animations
import gsap from 'gsap';

// Text images
import upperTextImg from '@assets/pngtext/letsmakeyour.png';
import lowerTextImg from '@assets/pngtext/unforgettable.png';

// Component
import Button from '@components/Button/Button';

const events = [
    'Wedding Reception',
    'Anniversary',
    'Birthday',
    'Engagement',
    'Reunion',
    'Party'
];

const ANIMATION_DELAY = 800;
const DISPLAY_DURATION = 5000;

export default function LagoonTeaser() {

    const [ eventIndex, setEventIndex ] = useState(0);
    const handwrittenRef = useRef(null);

    useLayoutEffect(() => {
        if (!handwrittenRef.current) return;

        const timer = setInterval(() => {
            gsap.to(handwrittenRef.current, { opacity: 0 });

            setTimeout(() => {
                setEventIndex(prev => (
                    events.length !== prev +1
                    ? prev +1
                    : 0
                ));
            }, ANIMATION_DELAY);
        
            setTimeout(() => {
                gsap.to(handwrittenRef.current, { opacity: 1 });
            }, ANIMATION_DELAY);
            
        }, DISPLAY_DURATION);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.teaser}>
                <div className={`${styles.typed} ${styles.upper}`}>
                    <img src={upperTextImg} className={styles.textImage} />
                </div>

                <div className={styles.handwritten} ref={handwrittenRef}>
                    { events[eventIndex] }
                </div>

                <div className={`${styles.typed} ${styles.lower}`}>
                    <img src={lowerTextImg} className={styles.textImage} />
                </div>
            </div>

            <div className={styles.navContainer}>
                <nav className={styles.nav}>
                    <Button style='neutral' name='Check out the venue' onClick={() => {}}/>
                    <Button style='accent' name='Book an event' onClick={() => {}}/>
                </nav>
            </div>
        </div>    
    );
}
