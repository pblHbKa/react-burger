import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ onlyUnAuth, user, children, ...props }) => {
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
};