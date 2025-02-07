import { ServiceClient } from "./ServiceClient";

export class ContentfulClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'contentful.php';

    public async getEntries(entryIds: string, params?: string) {
        let target = `${this.endpoint}?type=entries&content_type_ids=${entryIds}`;

        if (params) {
            target = `${target}&params=${params}`
        }

        return await this.client.get(
            target,
            true
        );
    }
}