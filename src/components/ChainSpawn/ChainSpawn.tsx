/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from 'react';

interface IChainSpawn {
    items: any[];
}

const DELAY = 150;

export default function ChainSpawn({ items }: IChainSpawn) {

    const [ renderList, setRenderList ] = useState<any[]>([]);

    useLayoutEffect(() => {
        setRenderList([]);

        items.forEach((item, index) => {
            setTimeout(() => {
                setRenderList(prev => [...prev, item]);
            }, (DELAY * index));
        });
    }, [ items ]); 

    return (
        <>
            {renderList.map((item, index) => (
                <div key={`ChainSpanItem-${index}`}>
                    {item}
                </div>
            ))}
        </>    
    );
}
