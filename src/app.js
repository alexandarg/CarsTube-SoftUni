import { decorateContext } from "./middleware/decorateContext.js";
import { updateUserNav } from "./middleware/updateUserNav.js";
import { page } from "./lib.js";

import { homePage } from "./views/homePage.js";
import { catalogPage } from "./views/catalogPage.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";
import { createPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { listingsPage } from "./views/userListings.js";
import { searchPage } from "./views/searchPage.js";

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-listings', listingsPage);
page('/search', searchPage);

page.start();
updateUserNav();