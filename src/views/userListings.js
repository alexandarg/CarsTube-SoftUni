import { getUserItems } from "../api/data.js";
import { html, until } from "../lib.js";
import { getUserData } from "../util.js";

const listingsTemplate = (dataPromise) => html`
<section id="my-listings">
    <h1>My car Listings</h1>
    <div class="listings">
        ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`

const cardCard = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${car._id}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`

export function listingsPage(ctx) {
    ctx.render(listingsTemplate(loadItems()));
}

async function loadItems() {
    const userData = getUserData();
    const items = await getUserItems(userData.id);

    if (items.length == 0) {
        return html`<p class="no-cars">You haven't listed any cars yet.</p>`;
    } else {
        return items.map(cardCard);
    }
}