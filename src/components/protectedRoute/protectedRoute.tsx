import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { ILocationState } from "../../services/types/data";
import { getCookie } from "../../utils/cookies";

interface IProtectedRouteProps {
  onlyUnAuth: boolean;
  children?: React.ReactNode;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ onlyUnAuth, children, ...props }) => {
  const location = useLocation<ILocationState>();
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