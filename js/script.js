import { getExistingFavorites } from "./utilities/getExistingFavorites.js";

const url = "http://localhost:1337/articles";
const container = document.querySelector(".container");
const favorites = getExistingFavorites();

async function createList() {
  const response = await fetch(url);
  const data = await response.json();
  
  data.forEach((product) => {
    let cssClass = "far";

    const doesArticleExist = favorites.find(function (fav) {
      return parseInt(fav.id) === data.id;
    })

    if (doesArticleExist) {
      cssClass = "fa";
    }
 
    let title = product.title;
    let summary = product.summary;
    let author = product.author;
    container.innerHTML += `<div class="products">
                              <h2>${title}</h1>
                              <p>${summary}</p>
                              <p>${author}</p>
                              <i class="far fa-heart" data-id"${product.id}" data-name="${title}"></i>
                            </div>`

    const iconToClick = document.querySelectorAll(".products i");
    console.log(iconToClick);

    iconToClick.forEach((icon) => {
        icon.addEventListener("click", addToList);
    });
})
}

createList();

function addToList() {
  this.classList.toggle("fa");
  this.classList.toggle("far");

  const id = this.dataset.id;
  const name = this.dataset.name;

  const currentFavorites = getExistingFavorites();

  const ifArticleExist = currentFavorites.find(function(fav) {
    return fav.id === id;
  });
  
  if (ifArticleExist === undefined) {
    const article = { id: id, title: name };
    currentFavorites.push(article);
    saveToFavorites(currentFavorites);
  }
  else {
    const newFavorites = currentFavorites.filter((fav) => fav.id !== id);
    saveToFavorites(newFavorites);
  }
}

function saveToFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}