/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from "react";
import gsap from "gsap";

type Ref = RefObject<HTMLElement>;

type VerticalStart = 'top' | 'bottom';
type HorizontalStart = HorizontalDirection;
type Start = VerticalStart | HorizontalStart;

export enum AnimationDuration {
    VeryFast = 0.1,
    Fast = 0.3,
    Medium = 0.5,
    Slow = 0.8
}

export type AnimationDirection = 'in' | 'out';

const SLIDE_DISTANCE = '50px';

function animate(ref: Ref, from: object, to: object) {
    if (ref.current) {
        return gsap.fromTo(ref.current, from, to)
    }
    
    return null;
}

interface ISlideOptions {
    duration?: AnimationDuration, 
    distance?: string,
    fade?: boolean,
    ease?: string,
}
function slideIn(ref: Ref, start: Start, options?: ISlideOptions) {
    return slide(ref, start, 'in', options)
}

function slideOut(ref: Ref, start: Start, options?: ISlideOptions) {
    return slide(ref, start, 'out', options)
}

function slide(ref: Ref, start: Start, direction: AnimationDirection, options?: ISlideOptions) {
    const duration = options?.duration || AnimationDuration.Medium;
    const distance = options?.distance || SLIDE_DISTANCE;
    const fade = options?.fade || false;

    let from: any = {};
    let to: any = {};

    switch (start) {
        case 'bottom': {
            from = { y: distance };
            to = { y: 0 };

            break;
        };

        case 'top': {
            from = { y: `-${distance}` };
            to = { y: 0 };

            break;
        }

        case 'left': {
            from = { left: `-${distance}` };
            to = { left: 0 }

            break;
        }

        case 'right': {
            from = { x: `-${distance}` };
            to = { x: 0 }

            break;
        }
    }

    if (fade) {
        from.opacity = 0;
        to.opacity = 1;
    }
    
    if (direction === 'in') {
        to.duration = duration;
        return animate(ref, from, to);
    } else {
        from.duration = duration;
        return animate(ref, to, from);
    }
}

interface IDarkenOptions {
    duration?: AnimationDuration
}
function darkenBgIn(ref: Ref, options?: IDarkenOptions) {
    darkenBg(ref, 'in', options);
}

function darkenBgOut(ref: Ref, options?: IDarkenOptions) {
    darkenBg(ref, 'out', options);
}

function darkenBg(ref: Ref, direction: AnimationDirection, options?: IDarkenOptions) {
    const duration = options?.duration || AnimationDuration.Medium;

    let from: any = {};
    let to: any = {};

    from = { background: 'rgba(0, 0, 0, 0)' }
    to = { background: 'rgba(0, 0, 0, 0.8)' }

    if (direction === 'in') {
        to.duration = duration;
        return animate(ref, from, to);
    } else {
        from.duration = duration;
        return animate(ref, to, from);
    }
}

export default {
    slideIn,
    slideOut,
    darkenBgIn,
    darkenBgOut
}
