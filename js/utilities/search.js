import { displayData } from "../data/displayData.js";
import { getExistingFavorites } from "./getExistingFavorites.js";

export function searchInData (data) {
  const search = document.querySelector("input.search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();
  
    const filterTitles = data.filter(function(article) {
      if(article.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });
  
    displayData(filterTitles);
    getExistingFavorites();
  };

}