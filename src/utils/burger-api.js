const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export function createOrder(ingredients) {
  return request(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  })
}

export function getIngredients() {
  return request(`${BURGER_API_URL}/ingredients`)
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
