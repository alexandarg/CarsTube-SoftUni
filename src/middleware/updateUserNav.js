import { getUserData } from "../util.js";
import { onLogout } from "./logout.js";

export function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('logoutBtn').addEventListener('click', onLogout);

        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
}