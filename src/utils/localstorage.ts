export default class LocalStorage {
    private static readonly EVENT_KEY = 'events';

    private static _timestampObject(object: any) {
        return {
            ...object,
            lastOpened: new Date().toISOString()
        }
    }

    public static get(key: string) {
        return JSON.parse(localStorage.getItem(key) ?? '{}');
    }

    public static getArray(key: string) {
        return JSON.parse(localStorage.getItem(key) ?? '[]');
    }

    public static add(key: string, value: string | object | any[]) {

        // This does also cover arrays because they are caught as typeof object
        // Source: trust me bro
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    public static getEvents() {
        const array = this.getArray(this.EVENT_KEY);

        const sortedArray = array.sort((a: any, b: any) => {
            const timeA = new Date(a.lastOpened).getTime();
            const timeB = new Date(b.lastOpened).getTime();
            return timeB - timeA;
        });

        return sortedArray;
    }

    public static addToEvents(value: string | object) {
        const array = this.getArray(this.EVENT_KEY);
        const duplicateEntryIndex = array.findIndex((item: any) => item.id === (value as any).id);

        if (duplicateEntryIndex !== -1) {
            const updatedEntry = this._timestampObject(array[duplicateEntryIndex]);

            array.splice(duplicateEntryIndex, 1);
            array.unshift(updatedEntry);

            console.log('replacing the storage with this new array:', array)

            this.add(this.EVENT_KEY, array);
            return array;
        }
        
        array.unshift(this._timestampObject(value));

        console.log('replacing the storage with this new array:', array)
        this.add(this.EVENT_KEY, array);

        return array;
    }
}
