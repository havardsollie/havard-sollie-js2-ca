import { displayData } from "../data/displayData.js";

const clearListButton = document.querySelector("#clear");
const productContainer = document.querySelector(".product-container");

export function clearTheList() {
  clearListButton.addEventListener("click", clearList);

  function clearList() {
    localStorage.clear();

    displayData([]);

    productContainer.innerHTML = "The list has been cleared";
    clearListButton.disabled = true;
  }
}