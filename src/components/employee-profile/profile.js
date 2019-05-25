import React, { Component } from "react";
import MyAppBar from "../appBar";

class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <MyAppBar />
        <div className="container-fluid">Welcome to your profile!!!</div>
      </React.Fragment>
    );
  }
}

export default Profile;
