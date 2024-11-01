import { ServiceClient } from "./ServiceClient";

export enum Entry {
    LandingPage = '2JVjG5yd2SmmYD7hfz1nQX',
    VenuePage = '4V4xAQS5MnjbhkOkwk6HBv'
}

export class ContentfulClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'contentful.php';

    public async getEntries() {
        return await this.client.get(
            `${this.endpoint}?type=entries`,
            true
        );
    }

    public async getEntry(entry: Entry) {
        return await this.client.get(
            `${this.endpoint}?entry_id=${entry}&type=entry`,
            true
        );
    }

    public async getField(entry: Entry, name: string) {
        return await this.client.get(
            `${this.endpoint}?entry_id=${entry}&name=${name}&type=field`
        );
    }

    public async getJsonField(entry: Entry, name: string) {
        return await this.client.get(
            `${this.endpoint}?entry_id=${entry}&name=${name}&type=jsonField`,
            true
        );
    }

    public async getFieldArray(entry: Entry, name: string) {
        return await this.client.get(
            `${this.endpoint}?entry_id=${entry}&name=${name}&type=fieldArray`,
            true
        );
    }

    public async getImage(entry: Entry, name: string) {
        const result = await this.client.get(
            `${this.endpoint}?entry_id=${entry}&name=${name}&type=image`
        );

        return result;
    }
}