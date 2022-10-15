const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export function getIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then((res) => checkResponse(res))
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
