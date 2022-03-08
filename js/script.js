import { getExistingFavorites } from "./utilities/getExistingFavorites.js";

const url = "http://localhost:1337/articles";
const productContainer = document.querySelector(".product-container");
const search = document.querySelector("input.search");

const favorites = getExistingFavorites();


async function createList() {
  const response = await fetch(url);
  let data = await response.json();

  productContainer.innerHTML = "";
  
  data.forEach((product) => {
    let cssClass = "far";

    const doesArticleExist = favorites.find(function (fav) {
      return parseInt(fav.id) === data.id;
    })

    if (doesArticleExist) {
      cssClass = "fa";
    }

    productContainer.innerHTML += `<div class="products">
                              <h2>${product.title}</h1>
                              <p>${product.summary}</p>
                              <p>${product.author}</p>
                              <i class="far fa-heart" data-id="${product.id}" data-name="${product.title}"></i>
                            </div>`

    const iconToClick = document.querySelectorAll(".products i");

    iconToClick.forEach((icon) => {
        icon.addEventListener("click", addToList);
    });
    search.onkeyup = function (event) {
      console.log(event);
      const searchValue = event.target.value.trim().toLowerCase();
    
      const filterTitles = data.filter(function(object) {
        if(object.title.toLowerCase().startsWith(searchValue)) {
          return true;
        }
      })
      console.log(filterTitles);
    
      data = filterTitles;
    
      createList();
    }
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