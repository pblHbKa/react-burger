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

export function resetPassword(email) {
  return request(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
}

export function setPassword(password, token) {
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  })
}

export function newUser(email, password, name) {
  return request(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
