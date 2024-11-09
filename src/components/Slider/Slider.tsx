/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Slider.module.scss';
import { useState } from 'react';

// Components
import Button from '@components/Button/Button';
import Text from '@components/Text/Text';

interface ISlider {
    title?: string;
    options: string[];
    defaultIndex?: number;
    callback?: any;
}

export default function Slider({ title, options, defaultIndex = 0, callback}: ISlider) {

    const [ selectedOption, setSelectedOption ] = useState<number>(defaultIndex);

    function onOptionChange(index: number) {
        setSelectedOption(index);
        if (callback) {
            callback(index);
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.title}>
                <Text size='sm'>
                    { title }
                </Text>
            </div>
            
            <div className={styles.options}>
                {
                    options.map((option, index) => (
                        <span className={styles.option} key={`SliderOption-${index}`}>
                            <Button 
                                name={option}
                                onClick={() => {onOptionChange(index)}}
                                style={index === selectedOption ? 'primary' : false}
                            />
                        </span>
                    ))
                }
            </div>
        </div>    
    );
}
