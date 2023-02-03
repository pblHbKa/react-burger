import { TToken } from "../services/types/common";
import { IUserInfo } from "../services/types/data";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const BURGER_WS_ORDERS = "wss://norma.nomoreparties.space/orders";

export function createOrder(ingredients: Array<string>, token: TToken) {
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

export function resetPassword(email: string) {
  return request(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export function setPassword(password: string, token: TToken) {
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
}

export function createUser({ email, password, name }: IUserInfo) {
  return request(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
}

export function authorization({ email, password }: {email: string; password: string }) {
  return request(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function logout(token: TToken) {
  return request(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}

export function updateToken(tokenRefresh: TToken, tokenAccess: TToken) {
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

export function getUserInfo(token: TToken) {
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

export function updateUserInfo(token: TToken, { name, email, password }: IUserInfo) {
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

function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
};
