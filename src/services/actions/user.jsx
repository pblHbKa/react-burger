import {
  getUserInfo as getUserInfoAPI,
  updateToken,
  authorization,
  logout,
  updateUserInfo as updateUserInfoAPI,
  createUser as createUserAPI,
} from "../../utils/burger-api";
import { clearUserInfo, setUserInfo } from "../reduces/user";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

export function getUserInfo() {
  return function (dispatch) {
    const token = getCookie("accessToken");
    getUserInfoAPI(token)
      .then((res) => {
        if (res === 403) {
          const accessToken = getCookie("accessToken");
          const refreshToken = getCookie("refreshToken");
          updateToken(refreshToken, accessToken)
            .then((res) => {
              if (res.success) {
                let { accessToken, refreshToken } = res;
                accessToken = accessToken.split("Bearer ")[1];
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", refreshToken);
                getUserInfoAPI(accessToken)
                .then((res) => {
                  if (res !== 403) {
                    dispatch(setUserInfo(res.user));
                }})
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch(setUserInfo(res.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function signIn(email, password) {
  return function (dispatch) {
    return authorization({ email, password })
      .then((res) => {
        if (res.success) {
          let { accessToken, refreshToken } = res;
          accessToken = accessToken.split("Bearer ")[1];
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);
          dispatch(setUserInfo(res.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function signOut() {
  return function (dispatch) {
    const token = getCookie("refreshToken");
    return logout(token).then((res) => {
      if (res.success) {
        dispatch(clearUserInfo());
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      }
    });
  };
}

export function updateUserInfo(userData) {
  return function (dispatch) {
    const token = getCookie("accessToken");
    return updateUserInfoAPI(token, userData).then((res) => {
      if (res.success) {
        dispatch(setUserInfo(res.user));
      }
    });
  };
}

export function createUser(userData) {
  return function (dispatch) {
    return createUserAPI(userData).then((res) => {
      if (res.success) {
        let { accessToken, refreshToken } = res;
        accessToken = accessToken.split("Bearer ")[1];
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        dispatch(setUserInfo(res.user));
      }
    });
  };
}
