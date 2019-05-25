import React from "react";
import "./App.css";
import "typeface-roboto";
import { Route, Switch } from "react-router-dom";
import Profile from "./components/employee-profile/profile";
import Bank from "./components/employee-profile/bank/bank-index";
import BankAdd from "./components/employee-profile/bank/bank-add";
import BankEdit from "./components/employee-profile/bank/bank-edit";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Profile} />
      <Route path="/bank" exact component={Bank} />
      <Route path="/bank/add" exact component={BankAdd} />
      <Route path="/bank/edit/:id" exact component={BankEdit} />
      <Route path="*" exact component={Profile} />
    </Switch>
  );
}

export default App;
