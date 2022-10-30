const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export function createOrder(ingredients) { 
  return fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients})
    })
    .then((res) => checkResponse(res))
  }

export function getIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then((res) => checkResponse(res))
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
