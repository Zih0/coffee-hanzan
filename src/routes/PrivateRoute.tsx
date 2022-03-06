import { Route, Redirect, RouteProps } from "react-router-dom";
import { useIsLoggedIn } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="/" />
  );
}

export default PrivateRoute;
