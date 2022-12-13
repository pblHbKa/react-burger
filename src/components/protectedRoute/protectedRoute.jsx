import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../services/reduces/user";

export const ProtectedRoute = ({ onlyUnAuth, children, ...props }) => {
  const location = useLocation();

  const auth = useAuth();
  const user = auth.user;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
};