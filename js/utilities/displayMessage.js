export function displayMessage(message, target) {
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = `<div class="message">${message}</div>`;
}