import { getExistingFavorites } from "./utilities/getExistingFavorites.js";
import { displayData } from "./data/displayData.js";

const favorites = getExistingFavorites();

const productContainer = document.querySelector(".product-container");

if(favorites.length === 0) {
  productContainer.innerHTML = "There are no favorites";
}

favorites.forEach((product) => {
  productContainer.innerHTML += `<div class="products">
                                  <h2>${product.title}</h1>
                                  <p>${product.summary}</p>
                                  <p>${product.author}</p>
                                  <i class="fa fa-heart"</i>
                                </div>`
});

const clearListButton = document.querySelector("#clear");

function clearTheList() {
  clearListButton.addEventListener("click", clearList);

  function clearList() {
    localStorage.clear();

    displayData([]);

    productContainer.innerHTML = "The list has been cleared";
  }
}

clearTheList();