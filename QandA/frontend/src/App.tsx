import React from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { SignInPage } from './SignInPage';
import { VraagPage } from './VraagPage';
import { ZoekPage } from './ZoekPage';
import { PageNotFound } from './PageNotFound';

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';
import { QuestionPage } from './QuestionPage';

//pag 152
function App() {
  debugger;
  return (
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
          <Route path="/vraag" component={VraagPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/vragen/:questionId" component={QuestionPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
