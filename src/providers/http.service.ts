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
        return fetch(request).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    },

    





    put: (path: string, body?: any, params?: { [param: string]: string | string[] }) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'POST',
            body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
            headers: HttpService.getHeader()
        });
        return fetch(request).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    },

    get: async (path: string, body?: any) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'GET',
            body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
            headers: HttpService.getHeader()
        });
        return fetch(request).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    },

    delete: (path: string, body?: any) => {
        const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
            method: 'DELETE',
            body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
            headers: HttpService.getHeader()
        });
        return fetch(request).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    },

    getHeader: () => {
        // Will be modified later to send the authToken from firebase
        return new Headers({
            Authorization: 'Bearer ' + idToken
        });
        // {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json'
        // }
    }

};

export default HttpService;
