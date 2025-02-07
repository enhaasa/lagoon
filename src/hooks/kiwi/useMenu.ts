import { useState, useEffect } from "react";

import { KiwiClient } from "@service_clients/KiwiClient";

// Types
import { TDiningItem } from "@enhasa/kiwicore";

type DiningCategories = {
    [key: string]: TDiningItem[];
}

export type UseMenu = {
    categories: null | DiningCategories;
};

const MENU_SORTING_ORDER = ['Meals', 'Drinks', 'Cocktails', ];

export default function useMenu(client: KiwiClient) {
    const [ categories, setCategories ] = useState<null | DiningCategories>(null);

    useEffect(() => {
        (async () => {
            const menuResult: TDiningItem[] = await client.getMenu();
            const specialItems: any[] = [];

            const parsedMenu: DiningCategories = {};

            menuResult.forEach((item) => {
                if (!parsedMenu[item.type]) {
                    parsedMenu[item.type] = [];
                } else {
                    const specialItem = specialItems.find(specialItem => specialItem.id === item.id);
                    
                    parsedMenu[item.type].push(specialItem ?? item);
                }
            });

            const categories = _sortMenuByOrder(parsedMenu);
            const {Legacy, ...filteredCategories } = categories;

            setCategories(filteredCategories);
        })();
    }, [client]);

    return { categories };

    function _sortMenuByOrder<T extends Record<string, unknown>>(obj: T): T {
        const sortedKeys: string[] = [];
        for (const sortKey of MENU_SORTING_ORDER) {
          if (sortKey in obj) {
            sortedKeys.push(sortKey);
          }
        }
        for (const key of Object.keys(obj)) {
          if (!MENU_SORTING_ORDER.includes(key)) {
            sortedKeys.push(key);
          }
        }
      
        const sortedObj: Record<string, unknown> = {};
      
        for (const key of sortedKeys) {
          sortedObj[key] = obj[key]; 
        }
      
        return sortedObj as T;
      }
}