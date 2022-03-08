import { getExistingFavorites } from "./utilities/getExistingFavorites.js";
import { clearTheList } from "./utilities/clearingTheList.js";

clearTheList();

const favorites = getExistingFavorites();
const clearListButton = document.querySelector("#clear");
const productContainer = document.querySelector(".product-container");

if(favorites.length === 0) {
  clearListButton.style.display = "none";
  productContainer.innerHTML = "There are no favorites";
}

favorites.forEach((product) => {
  productContainer.innerHTML += `<div class="products">
                                  <h3>${product.title}</h3>
                                  <p>${product.summary}</p>
                                  <p>${product.author}</p>
                                  <i class="fa fa-heart"</i>
                                </div>`
});