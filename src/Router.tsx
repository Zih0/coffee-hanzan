import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import { AuthContext } from "./contexts/AuthContext";
import Setting from "./pages/Setting";
import Payment from "./pages/Payment";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import { useContext } from "react";

function AppRouter() {
  const { auth } = useContext(AuthContext);
  return (
    <Router>
      <Header />
      <Switch>
        {!auth ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/" component={Feed} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/set-payment" component={Payment} />
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
