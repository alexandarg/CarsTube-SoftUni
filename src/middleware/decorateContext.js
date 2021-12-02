import { render } from '../lib.js'
import { updateUserNav } from './updateUserNav.js';

const root = document.querySelector('main');

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}