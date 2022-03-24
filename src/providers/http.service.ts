import { environment } from '../environments/environment';
import { idToken } from './auth.provider';

const HttpService = {

	/**
	 * POST http request to the server
	 * Throwable function
	 * ALWAYS use try-catch or .then().catch()
	 * @param path: string - the path of the request
	 * @param body: any - body of the request
	 * @return Promise<any>
	 */
	post: (path: string, body?: any) => {
		const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
			method: 'POST',
			body: new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}),
			headers: HttpService.getHeader()
		});
		return fetch(request).then(async (response) => {
			if (response.status === 500) {
				throw new Error();
			}
			try {
				return await response.json();
			} catch (error) {
				return true;
			}
		}).catch((error) => {
			throw error;
		});
	},

	patch: (path: string, body?: any) => {
		const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
			method: 'PATCH',
			body: body ?
				new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}) :
				null,
			headers: HttpService.getHeader()
		});
		return fetch(request).then(async (response) => {
			console.log(response);
			if (response.status === 500) {
				throw new Error();
			}
			try {
				return await response.json();
			} catch (error) {
				return true;
			}
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
			if (response.status === 500) {
				throw new Error();
			}
			try {
				return await response.json();
			} catch (error) {
				return true;
			}
		}).catch((error) => {
			throw error;
		});
	},

	delete: (path: string, body?: any) => {
		const request = new Request(environment.apiUrl + environment.apiPrefix + '/' + path, {
			method: 'DELETE',
			body: body ?
				new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}) :
				null,
			headers: HttpService.getHeader()
		});
		return fetch(request).then(async (response) => {
			if (response.status === 500) {
				throw new Error();
			}
			try {
				return await response.json();
			} catch (error) {
				return true;
			}
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
