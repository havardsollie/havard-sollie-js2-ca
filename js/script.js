const url = "http://localhost:1337/articles";
const container = document.querySelector(".container");

export async function createList() {
  const response = await fetch(url);
  const data = await response.json();
  
  for (let i = 0; i < data.length; i++) {
    let title = data[i].title;
    let summary = data[i].summary;
    let author = data[i].author;
    container.innerHTML += `<div class="products">
                              <h2>${title}</h1>
                              <p>${summary}</p>
                              <p>${author}</p>
                              <i class="far fa-heart" data-id"${data[i].id}" data-name="${title}"></i>
                            </div>`
  }
  const iconToClick = document.querySelectorAll(".products i");
  console.log(iconToClick);

  iconToClick.forEach((icon) => {
      icon.addEventListener("click", addToList);
  });
}

createList();

function addToList() {
  this.classList.toggle("fa");
  this.classList.toggle("far");

  const id = this.dataset.id;
  const name = this.dataset.name;

  const currentFavorites = getExistingFavorites();

  const doesArticleExist = currentFavorites.find(function(fav) {
    return fav.id === id;
  });
  
  if (doesArticleExist === undefined) {
    const article = { id: id, title: name };
    currentFavorites.push(article);
    saveToFavorites(currentFavorites);
  }
  else {
    const newFavorites = currentFavorites.filter(fav => fav.id !== id);
    saveToFavorites(newFavorites);
  }
}

function getExistingFavorites() {
  const favorites = localStorage.getItem("favorites");

  if(favorites === null) {
    return [];
  } else {
    return JSON.parse(favorites);
  }
}

function saveToFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}