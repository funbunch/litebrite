import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LiteBrite from "./components/LiteBrite";
import './App.css';

function App() {
  // return 
  return (
    <Router basename={'/litebrite'}>
      <Switch>
      <Route exact path='/'>
          <LiteBrite classic cols={22} rows={19} />
        </Route>

        <Route exact path='/sheet/:data' render={(props) => {
          const activeLights = JSON.parse(atob(props.match.params.data));
          console.log(activeLights)
          return (
            <LiteBrite activeLights={activeLights} classic cols={22} rows={19} />
          )
        }} />
      </Switch>
    </Router>
  )
}

export default App;
