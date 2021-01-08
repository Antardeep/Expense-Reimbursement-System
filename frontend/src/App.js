import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/css/App.css';

import Login from "./Screens/Login";
import EmployeeHome from "./Screens/EmployeeHome";
import ManagerHome from "./Screens/ManagerHome";
import Error from "./Screens/Error";

function App() {
  return (
    <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/employeeHome" component={EmployeeHome} />
            <Route path="/managerHome" component={ManagerHome} />
            <Route component={Error}/>
          </Switch>
    </BrowserRouter>
  );
}

export default App;
