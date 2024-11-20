import { useState, useEffect } from "react";

import { KiwiClient } from "@service_clients/KiwiClient";
import { TDiningItem } from "@enhasa/kiwicore";

type DiningCategories = {
    [key: string]: TDiningItem[];
}

export type UseMenu = null | DiningCategories;

export default function useMenu(client: KiwiClient) {
    const [ content, setContent ] = useState<null | DiningCategories>(null);

    useEffect(() => {
        client.getMenu().then((result: TDiningItem[]) => {

            const parsedResult: DiningCategories = {};
            
            result.forEach((item) => {
                if (!parsedResult[item.type]) {
                    parsedResult[item.type] = [];
                } else {
                    parsedResult[item.type].push(item);
                }
            });

            setContent(parsedResult);
        });
    }, [client]);

    return content
}