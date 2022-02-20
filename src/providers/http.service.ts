import { environment } from '../environments/environment';
import { idToken } from './auth.provider';

const HttpService = {

    // async function (use .then)
    post: (path: string, body?: any) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'POST',
            body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
            headers: HttpService.getHeader()
        });
        return fetch(request).then(async (response) => {
            if (response.status === 200 && !response.bodyUsed) {
                return true;
            }
            return await response.json();
        }).catch((error) => {
            throw error;
        });
    },

    put: (path: string, body?: any, params?: { [param: string]: string | string[] }) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'POST',
            body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
            headers: HttpService.getHeader()
        });
        return fetch(request).then(async (response) => {
            if (response.status === 200 && !response.bodyUsed) {
                return true;
            }
            return await response.json();
        }).catch((error) => {
            throw error;
        });
    },

    get: async (path: string) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'GET',
            headers: HttpService.getHeader()
        });
        return fetch(request).then(async (response) => {
            if (response.status === 200 && !response.bodyUsed) {
                return true;
            }
            return await response.json();
        }).catch((error) => {
            throw error;
        });
    },

    delete: (path: string, body?: any) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'DELETE',
            body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
            headers: HttpService.getHeader()
        });
        return fetch(request).then(async (response) => {
            if (response.status === 200 && !response.bodyUsed) {
                return true;
            }
            return await response.json();
        }).catch((error) => {
            throw error;
        });
    },

    getHeader: () => {
        return new Headers({
            Authorization: 'Bearer ' + idToken
        });
    }

};

export default HttpService;
