import { createBrowserHistory } from "history";
import React, { Component, lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit-icons.min";
import "uikit/dist/js/uikit.min";
import { ProvideAuth } from "../../components/Auth/Auth";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { auth } from "../../firebase";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";
import "./App.css";

// import UIkit from 'uikit';

const Home = lazy(() => import('../Home/Home'));
const Application = lazy(() => import('../Application/Application'));
const CasePage = lazy(() => import('../CasePage/CasePage'));
const Cases = lazy(() => import('../Cases/Cases'));
const Translators = lazy(() => import('../Translators/Translators'));
const Statistics = lazy(() => import('../Statistics/Statistics'));
const Onboarding = lazy(() => import('../Onboarding/Onboarding'));
const Settings = lazy(() => import('../Settings/Settings'));
const CreateAccount = lazy(() => import('../CreateAccount/CreateAccount'));
const Login = lazy(() => import("../Login/Login"));
const ForgotPassword = lazy(() => import('../ForgotPassword/ForgotPassword'));

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      user.getIdTokenResult().then((idTokenResult) => {
        const role = idTokenResult.claims.role;
        if (role === "admin" || role === "super_admin") {
          this.setState({ admin: true });
        }
      });
    });
  }

  render() {
    return (
      <ProvideAuth>
        <Router history={history}>
          <Suspense fallback={<div></div>}>
            <Switch>
              {this.state.admin ? (
                <PrivateRoute exact path="/">
                  <Cases />
                </PrivateRoute>
              ) : (
                <PrivateRoute exact path="/">
                  <Home />
                </PrivateRoute>
              )}
              <Route exact path="/application">
                <Application />
              </Route>
              <PrivateRoute exact path="/onboarding" requiredRole={"admin"}>
                <Onboarding />
              </PrivateRoute>
              <PrivateRoute exact path="/settings">
                <Settings />
              </PrivateRoute>
              <PrivateRoute exact path="/statistics">
                <Statistics />
              </PrivateRoute>
              <PrivateRoute exact path="/translator" requiredRole={"admin"}>
                <Translators />
              </PrivateRoute>
              <PrivateRoute exact path="/case" requiredRole={"admin"}>
                <Cases />
              </PrivateRoute>
              <PrivateRoute
                exact
                path="/case/:case_id"
                component={CasePage}
              ></PrivateRoute>
              <Route exact path="/createaccount">
                <CreateAccount />
              </Route>
              <Route exact path="/forgotpassword">
                <ForgotPassword />
              </Route>
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/unathorized"
                render={(props) => <UnauthorizedPage {...props} />}
              />
              <PrivateRoute exact path="/mycases">
                <Home />
              </PrivateRoute>
              )
            </Switch>
          </Suspense>
        </Router>
      </ProvideAuth>
    );
  }
}

export default App;
