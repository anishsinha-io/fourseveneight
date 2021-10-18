import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/spinner/Spinner";

export interface IPrivateRouteProps extends RouteProps {
  redirectPath: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.loading);

  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default PrivateRoute;
