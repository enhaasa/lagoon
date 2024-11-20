/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import { KiwiClient } from "@service_clients/KiwiClient";

export interface IUseMenu {
    content: any;
}

export default function useMenu(client: KiwiClient) {
    const [ content, setContent ] = useState<null | any>(null);

    useEffect(() => {
        client.getMenu().then((result: any) => {

            const parsedResult: any = {};
            
            result.forEach((item: any) => {
                if (!parsedResult[item.type]) {
                    parsedResult[item.type] = [];
                } else {
                    parsedResult[item.type].push(item);
                }
            });

            setContent(result);
        });
    }, [client]);

    return content
}