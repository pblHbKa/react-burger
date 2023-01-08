const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const BURGER_WS_ORDERS = "wss://norma.nomoreparties.space/orders";

export function createOrder(ingredients, token) {
  return request(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ ingredients }),
  });
}

export function getIngredients() {
  return request(`${BURGER_API_URL}/ingredients`);
}

export function resetPassword(email) {
  return request(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export function setPassword(password, token) {
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
}

export function createUser({ email, password, name }) {
  return request(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
}

export function authorization({ email, password }) {
  return request(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function logout(token) {
  return request(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}

export function updateToken(tokenRefresh, tokenAccess) {
  return request(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenAccess,
    },
    body: JSON.stringify({ "token": tokenRefresh }),
  });
}

export function getUserInfo(token) {
  return fetch(`${BURGER_API_URL}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
     } else if (res.status === 403)  {
      return (res.status);
     }});
}

export function updateUserInfo(token, { name, email, password }) {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ email, name, password }),
  });
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
