export class LocalStorage {
    get(key: string) {
        return localStorage.getItem(key);
    }

    add(key: string, value: string | object) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }
}