import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useIsLoggedIn } from "./contexts/AuthContext";
import Header from "./components/Header";
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Setting = lazy(() => import("./pages/Setting"));
const Payment = lazy(() => import("./pages/Payment"));
const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));

function AppRouter() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Suspense fallback={<></>}>
      <Router>
        <Header />
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/" component={Feed} />
              <Route exact path="/setting" component={Setting} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/set-payment" component={Payment} />
            </>
          ) : (
            <>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Redirect from="*" to="/" />
            </>
          )}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default AppRouter;
