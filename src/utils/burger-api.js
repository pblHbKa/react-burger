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

export function createUser(email, password, name) {
  return request(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
}

export function authorization(email, password) {
  return request(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
}

export function logout(token) {
  return request(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
}

export function updateToken(token) {
  return request(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
}

export function getUserInfo(token) {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ token }),
  })
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
