import { useContext } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Header from './Header';
import { AuthContext } from '../contexts/AuthContext';

function AppRouter() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Header />
      <Switch>
        {!currentUser ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Redirect from="*" to="/" />
          </>
        ) : (
          <Route exact path="/" component={Home} />
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
