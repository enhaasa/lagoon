import styles from './Hero.module.scss';
import React from 'react';

interface IHero {
    image: string;
    children?: React.ReactNode
}

export default function Hero({ image, children }: IHero) {

    return (
        <div className={styles.container} >
            <div className={styles.image} style={{ backgroundImage: `url("${image}")` }} />

            <div className={styles.text}>
                { children }
            </div>
        </div>    
    );
}
