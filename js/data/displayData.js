import { getExistingFavorites } from "../utilities/getExistingFavorites.js";

const favorites = getExistingFavorites();

export function displayData (dataToDisplay) {
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = "";

  dataToDisplay.forEach(function (product) {
    let cssClass = "far";

    const checkExistenceOfArticle = favorites.find(function (fav) {
      return parseInt(fav.id) === product.id;
    })

    if (checkExistenceOfArticle) {
      cssClass = "fa";
    }

    productContainer.innerHTML += `<div class="products">
                              <h3>${product.title}</h3>
                              <p>${product.summary}</p>
                              <p>Author: ${product.author}</p>
                              <i class="${cssClass} fa-heart" data-id="${product.id}" data-name="${product.title}" data-summary="${product.summary}" data-author="${product.author}"></i>
                            </div>`
  });
}