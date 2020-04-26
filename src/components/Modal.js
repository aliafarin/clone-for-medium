import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

const Modal = (props) => {

  let closeModal = () => {
    $(".modal").css("display", "none");
  }

  let signIn = () => {
    props.signIn();
  } 
  
  return ReactDOM.createPortal(
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="auth" onClick={signIn}>
          <i className="large google icon"></i>
          <span>SignIn with Google</span>
        </div>
        <div className="auth github-auth">
          <i className="large github icon"></i>
          <span>SignIn with github</span>
        </div>
        <div className="auth facebook-auth">
          <i className="large facebook icon"></i>
          <span>SignIn with facebook</span>
        </div>
        <form className="modal-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal"));

}


export default Modal;