import { ServiceClient } from "./ServiceClient";

export class KiwiClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'kiwi.php';

    public async getMenu() {
        const target = `${this.endpoint}?type=menu`;

        return await this.client.get(target, true);
    }
}