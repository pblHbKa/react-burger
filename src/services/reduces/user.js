import { useContext, useState, createContext } from "react";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";
import { authorization, logout, createUser as createUserAPI, getUserInfo as getUserInfoAPI, updateUserInfo as updateUserInfoAPI } from "../../utils/burger-api";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const createUser = async (userData) => {
    const data = await createUserAPI(userData).then((res) => {
      if (res.success) {
        let { accessToken, refreshToken } = res;
        accessToken = accessToken.split("Bearer ")[1];
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        setUser(res.user);
      }
      return res.success;
    });
  };

  const signIn = async (userData) => {
    const data = await authorization(userData).then((res) => {
      if (res.success) {
        let { accessToken, refreshToken } = res;
        accessToken = accessToken.split("Bearer ")[1];
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        setUser(res.user);
      }
    });
  };

  const signOut = async () => {
    const token = getCookie("refreshToken");
    await logout(token).then((res) => {
      if (res.success) {
        setUser(null);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      }
    });
  };

  const getUserInfo = async () => {
    const token = getCookie("accessToken");
    const data = await getUserInfoAPI(token).then((res) => {
      if (res.success) {
        setUser(res.user);
      }
    });
  };

  const updateUserInfo = async (userData) => {
    const token = getCookie("accessToken");
    const data = await updateUserInfoAPI(token, userData).then((res) => {
      if (res.success) {
        return res.user;
      }
    });
  };

  return {
    user,
    signIn,
    signOut,
    createUser,
    getUserInfo,
    updateUserInfo
  };
}
