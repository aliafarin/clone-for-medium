import React from "react";
import { connect } from "react-redux";

import history from "../history";
import GoogleAuth from "./GoogleAuth";

class LoginPage extends React.Component {

  componentDidUpdate() {
    if(this.props.isSignedIn === true) {
      history.push("/articles");
    }
  }

  render() {

    return(
      <div id="login">
        <div className="login-box">
          <i className="massive medium m\ icon"></i> 
          <GoogleAuth />
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}


export default connect(mapStateToProps)(LoginPage);