import { getExistingFavorites } from "../utilities/getExistingFavorites.js";

const favorites = getExistingFavorites();

export function displayData (dataToDisplay) {
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = "";

  dataToDisplay.forEach(function (product) {
    let cssClass = "far";

    const doesArticleExist = favorites.find(function (fav) {
      return parseInt(fav.id) === product.id;
    })

    if (doesArticleExist) {
      cssClass = "fa";
    }

    productContainer.innerHTML += `<div class="products">
                              <h2>${product.title}</h1>
                              <p>${product.summary}</p>
                              <p>${product.author}</p>
                              <i class="${cssClass} fa-heart" data-id="${product.id}" data-name="${product.title}" data-summary="${product.summary}" data-author="${product.author}"></i>
                            </div>`
  });
}