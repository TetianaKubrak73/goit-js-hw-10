import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_k0wP8kTZDCn9HlRh7jup45ZGGt5gEPryn2wywZ6YRQKIa4xFhVFbpAmTBg7sWApG";
export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching breeds:", error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching cat by breed:", error);
      throw error;
    });
}
