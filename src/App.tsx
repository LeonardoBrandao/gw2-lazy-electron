import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import Addons from './components/Addons';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Addons} />
      </Switch>
    </Router>
  );
}
