import React from "react";
import "./styles/All.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./Pages/NavBar";
import { About } from "./Pages/About";
import { Choose } from "./Pages/Choose";
import { MyApi } from "./Pages/MyAPI";
import { Login } from "./Pages/Login";
import { Logged } from "./Pages/Logged";
import { Results } from "./Pages/Results";
import {Search} from './Components/Search'


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      
      <div className="container">
        <Switch>
          <Route component={About} exact path="/about" />
          <Route component={Choose} exact path="/information" />
          <Route component={MyApi} exact path="/my-api" />
          <Route component={Login} exact path="/" />
          <Route component={Logged} exact path="/system" />
          <Route component={Results} exact path="/results" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
