import { searchResult } from "../api/data.js";
import { html, until } from "../lib.js";

const searchTemplate = (onSearch, dataPromise) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <div class="listings">
        ${dataPromise == undefined 
            ? null
            : until(dataPromise, html`<p>Loading &hellip;</p>`)
        }
    </div>
</section>
`

const carCard = (car) => html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`


export function searchPage(ctx) {
    ctx.render(searchTemplate(onSearch))

    function onSearch() {
        ctx.render(searchTemplate(onSearch, loadItems()))
    }
}

async function loadItems() {
    const query = document.getElementById('search-input').value
    const cars = await searchResult(query)

    if (cars.length !== 0) {
        return html`
            <h2>Results:</h2>
            ${cars.map(carCard)}`;
    } else {
        return html`<p class="no-cars"> No results.</p>`
    }
}