import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends React.Component {

  renderRoute() {

    if( this.props.isSignedIn === null ) {
      return (
        <div>Loading</div>
      );
    }
    
    this.component = this.props.component;

    return(
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /login page
      <Route exact render={props => (
          this.props.isSignedIn ?
              <this.component {...props} {...this.props.computedMatch} /> //computedMatch will pass the props.match into route as well  
          : <Redirect to="/login" />
      )} />
    )
  
  }

  render(){
    return(
      <React.Fragment>
        {this.renderRoute()}
      </React.Fragment>
    )
  }
  
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(PrivateRoute);