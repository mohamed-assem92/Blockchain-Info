import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import LayoutComponent from './components/Layout/Layout';
import Blocks from './components/Blocks/Blocks';
import Block from './components/Block/Block';
import Transaction from './components/Transaction/Transaction';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <LayoutComponent>
          <Route exact path="/" render={() => <Redirect to="/blocks" />} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/block/:hash" component={Block} />
          <Route path="/transaction/:hash" component={Transaction} />
        </LayoutComponent>
      </Switch>
    </Router>
  );
}

export default App;
