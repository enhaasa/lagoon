import { ServiceClient } from "./ServiceClient";

export enum Entry {
    LandingPage = '2JVjG5yd2SmmYD7hfz1nQX'
}

export class ContentfulClient {
    private client = new ServiceClient('http://localhost:8000');
    private endpoint = 'contentful.php';

    public async getField(entry: Entry, name: string) {
        return await this.client.get(
            `${this.endpoint}?entry_id=${entry}&name=${name}&type=field`
        );
    }

    public async getImage(entry: Entry, name: string) {
        const result = await this.client.get(
            `${this.endpoint}?entry_id=${entry}&name=${name}&type=image`
        );


        return result;
    }
}