import styles from './Countdown.module.scss';

import { useEffect, useState } from 'react';

// Components
import Text from '@components/Text/Text';

type RemainingTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface ICountdown {
    date?: string;
}

export default function Countdown({ date }: ICountdown) {
    const [ remainingTime, setRemainingTime ] = useState<RemainingTime | null>(null);

    useEffect(() => {
        if (!date) return;

        setRemainingTime(_getRemainingTime(date));

        const interval = setInterval(() => {
            setRemainingTime(_getRemainingTime(date));
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [date]);

    return (
        <div className={styles.container}>
            {remainingTime &&
                (Object.keys(remainingTime) as Array<keyof RemainingTime>).map((key, index) => (
                    <span className={styles.item} key={`CountdownItem-${index}`}>
                        <span className={styles.value}>
                            <Text size={'xxl'}>
                                {remainingTime[key]}
                            </Text>
                        </span>

                        <span className={styles.unit}>
                            <Text>{key.charAt(0).toUpperCase()}</Text>
                        </span>
                    </span>
                ))
            }
        </div>    
    );
}

function _getRemainingTime(targetDateStr: string): RemainingTime {
    const targetDate = new Date(targetDateStr);
    const now = new Date();
    
    const differenceMs = targetDate.getTime() - now.getTime();

    if (differenceMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);
  
    return { days, hours, minutes, seconds };
  }
  
