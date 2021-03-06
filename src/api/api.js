import { clearUserData, getUserData, setUserData } from '../util.js';

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return request(url, createOptions('PUT', data));
}

export async function del(url) {
    return request(url, createOptions('DELETE'));
}

export async function login(username, password) {
    const result = await post('/users/login', { username, password });

    const userData = {
        username: result.username,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData);

    return result;
}

export async function register(username, password) {
    const result = await post('/users/register', { username, password });

    const userData = {
        username: result.username,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData);

    return result;
}

export async function logout() {
    await get('/users/logout');
    clearUserData();
}