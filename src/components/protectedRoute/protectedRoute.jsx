import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

export const ProtectedRoute = ({ onlyUnAuth, children, ...props }) => {
  const location = useLocation();
  const token = getCookie("accessToken");

  if (onlyUnAuth && token) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyUnAuth && !token) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
};