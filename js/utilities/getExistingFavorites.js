export function getExistingFavorites(data) {
  const favorites = localStorage.getItem("favorites");

  if(favorites === null) {
    return [];
  } else {
    return JSON.parse(favorites);
  }
}