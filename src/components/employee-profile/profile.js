import React, { Component } from "react";
import MyAppBar from "../appBar";

class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <MyAppBar />
        <div className="container-wrapper">Welcome to your profile!!!</div>
      </React.Fragment>
    );
  }
}

export default Profile;
