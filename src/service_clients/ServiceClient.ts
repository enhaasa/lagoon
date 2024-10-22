export class ServiceClient {
    private api: string;

    constructor(api: string) {
        this.api = api;
    }

    public async get(endpoint: string) {
        const response = await fetch(`${this.api}/${endpoint}`);
        const data = await response.text();

        return data;
    }

    public async post(endpoint: string, body: Record<string, unknown>) {
        const response = await fetch(`${this.api}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.text();

        return data;
    }
}