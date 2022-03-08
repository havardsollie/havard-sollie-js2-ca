import { displayData } from "./data/displayData.js";
import { getExistingFavorites } from "./utilities/getExistingFavorites.js";
import { searchInData } from "./utilities/search.js";
import { displayMessage } from "./utilities/displayMessage.js";

const url = "http://localhost:1337/articles";

async function createList() {

  try {
    const response = await fetch(url);
    const data = await response.json();

    displayData(data);
    searchInData(data);

    const iconToClick = document.querySelectorAll(".products i");

    iconToClick.forEach((icon) => {
        icon.addEventListener("click", addToList);
    });
  } catch (error) {
    displayMessage("Error. Not recieving data", error)
  }  
}
createList();

function addToList() {
  this.classList.toggle("fa");
  this.classList.toggle("far");

  const id = this.dataset.id;
  const name = this.dataset.name;
  const summary = this.dataset["summary"];
  const author = this.dataset["author"];

  const currentFavorites = getExistingFavorites();

  const ifArticleExist = currentFavorites.find(function(fav) {
    return fav.id === id;
  });
  
  if (ifArticleExist === undefined) {
    const article = { id: id, title: name, summary: summary, author: author };
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

