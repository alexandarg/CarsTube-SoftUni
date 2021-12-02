import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: '/data/cars?sortBy=_createdOn%20desc',
    latest: '/data/cars?sortBy=_createdOn%20desc&distinct=category',
    byId: '/data/cars/',
    myItems: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/cars',
    edit: '/data/cars/',
    delete: '/data/cars/',
    search: (query) => `/data/cars?where=year%3D${query}`
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getLatest() {
    return api.get(endpoints.latest);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getUserItems(userId) {
    return api.get(endpoints.myItems(userId))
}

export async function createItem(data) {
    return api.post(endpoints.create, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteItem(id) {
    return api.del(endpoints.delete + id);
}

export async function searchResult(query) {
    return api.get(endpoints.search(query));
}