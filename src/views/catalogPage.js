import { getAll } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (dataPromise) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
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

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadItems()));
}

async function loadItems() {
    const cars = await getAll();

    if (cars.length == 0) {
        return html`<p class="no-cars">No cars in database.</p>`;
    } else {
        return cars.map(cardCard);
    }
    
}