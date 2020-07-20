import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/pages/LandingPage';
import AuthState from './context/auth/AuthState';
import ThemeState from './context/theme/ThemeState.js';
import AlertState from './context/alert/AlertState';
import PostState from './context/post/PostState';
import ChartState from './context/chart/ChartState';
import CommentsState from './context/comments/CommentsState';
import SetThemeMode from './utils/SetThemeMode';
import DashBoard from './components/pages/DashBoard';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import { SnackbarProvider } from 'notistack';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <ThemeState>
      <AuthState>
        <SetThemeMode>
          <AlertState>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <PostState>
                <ChartState>
                  <CommentsState>
                    <Router>
                      <Fragment>
                        <Switch>
                          <Route exact path='/' component={LandingPage} />
                          <PrivateRoute
                            exact
                            path='/dashboard'
                            component={DashBoard}
                          />
                          <PrivateRoute
                            exact
                            path='/dashboard/graph'
                            component={DashBoard}
                          />
                          <PrivateRoute
                            exact
                            path='/dashboard/comments'
                            component={DashBoard}
                          />
                          <Route component={LandingPage} />
                        </Switch>
                      </Fragment>
                    </Router>
                  </CommentsState>
                </ChartState>
              </PostState>
            </SnackbarProvider>
          </AlertState>
        </SetThemeMode>
      </AuthState>
    </ThemeState>
  );
};

export default App;
