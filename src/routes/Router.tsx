import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '@components/Header';

import PrivateRoute from './PrivateRoute';

const SignUp = lazy(() => import('@pages/SignUp'));
const Home = lazy(() => import('@pages/Home'));
const Setting = lazy(() => import('@pages/Setting'));
const Payment = lazy(() => import('@pages/Payment'));
const Feed = lazy(() => import('@pages/Feed'));
const Profile = lazy(() => import('@pages/Profile'));

function AppRouter() {
    const location = useLocation();
    const [connectedGA, setConnectedGA] = useState(false);

    useEffect(() => {
        ReactGA.initialize('G-NQ6BDLQ9J9');
        setConnectedGA(true);
    }, []);

    useEffect(() => {
        if (!connectedGA) return;
        ReactGA.pageview(location.pathname + location.search);
    }, [connectedGA, location]);

    return (
        <>
            <Header />
            <Suspense fallback={<></>}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={SignUp} />

                    <PrivateRoute exact path="/setting" component={Setting} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute
                        exact
                        path="/set-payment"
                        component={Payment}
                    />

                    <Route path="/:nickname" component={Feed} />
                </Switch>
            </Suspense>
        </>
    );
}

export default AppRouter;
