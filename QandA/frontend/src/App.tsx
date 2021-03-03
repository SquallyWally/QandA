import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HeaderWithRouter as Header } from './Header';
import HomePage from './HomePage';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { SignInPage } from './SignInPage';

import { ZoekPage } from './ZoekPage';
import { PageNotFound } from './PageNotFound';

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';
import { QuestionPage } from './QuestionPage';
import { configStore } from './Store';
const VraagPage = lazy(() => import('./VraagPage'));

//229

//create instance from configureStore
const store = configStore();

function App() {
  debugger;
  return (
    <Provider store={store}>
      <Router>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Switch>
            <Redirect from="/home" to="/" />
            <Route exact path="/" component={HomePage} />

            <Route path="/zoek" component={ZoekPage} />
            <Route path="/vraag">
              <Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Laden.....
                  </div>
                }
              >
                <VraagPage />
              </Suspense>
            </Route>

            <Route path="/signin" component={SignInPage} />
            <Route path="/vragen/:questionId" component={QuestionPage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
