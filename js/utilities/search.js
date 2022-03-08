import { displayData } from "../data/displayData.js";

export function searchInData (data) {
  const search = document.querySelector("input.search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();
  
    const filterTitles = data.filter(function(object) {
      if(object.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });
  
    displayData(filterTitles);
  };

}