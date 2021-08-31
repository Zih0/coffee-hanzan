import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './components/Header';
import { AuthContext } from './contexts/AuthContext';
import Setting from './pages/Setting';
import Payment from './pages/Payment';
import Feed from './pages/Feed';
import Footer from './components/Footer/inedx';

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
          <>
            <Route exact path="/" component={Feed} />
            <Route exact path="/setting" component={Setting} />
            <Route path="/set-payment" component={Payment} />
            {/* <Redirect from="*" to="/" /> */}
          </>
        )}
      </Switch>
      <Footer />
    </Router>
  );
}

export default AppRouter;
