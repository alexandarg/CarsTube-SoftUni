import { page } from '../lib.js'
import { logout } from '../api/data.js'
import { updateUserNav } from './updateUserNav.js';

export async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}
