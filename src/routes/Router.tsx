import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import PrivateRoute from "./PrivateRoute";
const SignUp = lazy(() => import("../pages/SignUp"));
const Home = lazy(() => import("../pages/Home"));
const Setting = lazy(() => import("../pages/Setting"));
const Payment = lazy(() => import("../pages/Payment"));
const Feed = lazy(() => import("../pages/Feed"));
const Profile = lazy(() => import("../pages/Profile"));

function AppRouter() {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />

          <PrivateRoute exact path="/setting" component={Setting} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/set-payment" component={Payment} />

          <Route path="/:nickname" component={Feed} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default AppRouter;
