import React from "react";
import $ from "jquery";
import { connect } from "react-redux";

import Modal from "./Modal";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '274732364636-0qldg4ehspts7fmei1e4sn064n54ccv2.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange();
        this.auth.isSignedIn.listen(this.onAuthChange);
        });
      });
  }

  onAuthChange = () => {
    if( this.auth.isSignedIn.get() ) {
      let profile = this.auth.currentUser.get().getBasicProfile();
      this.props.signIn(profile);
    }
    else {
      this.props.signOut();
    }
  }

  displayModal = () => {
    $(".modal").css("display", "block");
  }

  signIn = () => {
    this.auth.signIn();
  }

  signOut = () => {
    this.auth.signOut(); 
  }

  renderAuth = () => {
    if( this.props.auth.isSignedIn === false ) {
      return(
        <div>
          <span style={{color: "rgba(2, 158, 116)"}} onClick={this.displayModal}>Sign in</span>
          <Modal signIn={this.signIn} />
        </div>
      );
    }
    else if( this.props.auth.isSignedIn === true ) {
      return(
        <div>
          <span style={{color: "rgb(200, 4, 4)"}} onClick={this.signOut}>LogOut</span>
        </div>
      );
    }
    else {
      return(
        <div>
          <span style={{color: "rgba(2, 158, 116)"}} onClick={this.displayModal}>Sign in</span>
          <Modal signIn={this.signIn} />
        </div>
      );
    }
  }

  render() {

    return(
      <div>
        {this.renderAuth()}
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect( mapStateToProps, {
  signIn,
  signOut
} )(GoogleAuth);