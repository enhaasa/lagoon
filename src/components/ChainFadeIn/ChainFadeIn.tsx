/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './ChainFadeIn.module.scss';
import { useLayoutEffect, useRef } from 'react';

// Animations
import gsap from 'gsap';

interface IChainFadeIn {
    items?: any[];
}

const DELAY = 100;

export default function ChainFadeIn({ items }: IChainFadeIn) {

    const itemRefs = useRef<HTMLDivElement[]>([]);

    itemRefs.current = [];

    useLayoutEffect(() => {
    
        items?.forEach((_, index) => {
            if (itemRefs.current[index]) {
                gsap.fromTo(
                    itemRefs.current[index],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, delay: index * DELAY / 1000}
                );
            }
        });
    }, [ items ]); 

    return (
        <>
            {items?.map((item, index) => (
                <div 
                    key={`ChainFadeInItem-${index}`}  
                    ref={(element) => {
                        if (element) itemRefs.current[index] = element;
                    }}
                >
                    {item}
                </div>
            ))}
        </>    
    );
}
