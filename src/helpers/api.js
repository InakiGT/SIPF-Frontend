import axios from 'axios';
import { getToken } from './token';

class Api {
    constructor(uri) {
        this.token = getToken();
        this.uri = uri;
        this.currentUri = uri;
    }

    async Get(endpoint, params) {
        this.currentUri = endpoint ? `${ this.uri }${ endpoint }` : this.uri;

        const response = await axios.get(this.currentUri, {
            params,
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return response;
    }

    async Post(data) {
        this.currentUri = this.uri;

        const response = await axios.post(this.currentUri, data, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        return response;
    } 

    async Put(data) {
        this.currentUri = this.uri;

        const response = await axios.put(this.currentUri, data, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        return response;
    } 
}

export default Api;