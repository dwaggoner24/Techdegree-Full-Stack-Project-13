//Referenced from Treehouse authentication project
//Data is essentially a helper class that provides utility methods to allow React to talk to Express server
import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requireAuth = false, credentials = null) {
        const url = config.apiUrl + path;

        const authOptions = {
            method, 
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            authOptions.body = JSON.stringify(body);
        }

        if (requireAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}: ${credentials.password}`);
            authOptions.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, authOptions);
    }

    async getUser() {
        const res = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (res.status === 200) {
            return res.json()
                .then(data => data);
        }
        else if (res.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async createUser(user) {
        const res = await this.api('/users', 'POST', user);
        if (res.status === 201) {
            return [];
        }
        else if (res.status === 400) {
            return res.json()
                .then(data => {
                    return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }
}