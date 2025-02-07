import styles from './MultiToggle.module.scss';

import { useEffect, useState } from 'react';

// Components
import Text from '@components/Text/Text';

interface IMultiToggle {
    options?: string[];
    onSelect: (option: string) => any;
    initSelected: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    activeColor?: 'gold' | 'silver' | 'blue';
}

export default function MultiToggle({ options, onSelect, size = 'md', activeColor = 'gold', initSelected }: IMultiToggle) {
    const [ selectedOption, setSelectedOption ] = useState(initSelected);

    function handleSelect(option: string) {
        setSelectedOption(option);
        onSelect(option);
    }

    useEffect(() => {
        setSelectedOption(initSelected);
    }, [ initSelected ]);

    console.log('multitoggle size', size)

    return (
        <div className={styles.container}>
            <nav>
                {
                    options?.map((option, index) => (
                        <button 
                            key={`MultiToggleOption-${index}`}
                            onClick={() => {handleSelect(options?.[index])}}
                            className={`
                                ${styles.option} 
                                ${styles[size ?? '']}
                                ${option === selectedOption ? `${styles['selected']} ${styles[activeColor]}` : ''}
                            `}
                        >
                            <Text size={size}>{option}</Text>
                        </button>
                    ))
                }
            </nav>
        </div>    
    );
}
