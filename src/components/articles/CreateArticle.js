import React from 'react';
import { connect } from "react-redux";
import $ from "jquery";

import "../Styles.css";
import Form from "../Form";
import { createArticle } from "../../actions";

class CreateArticle extends React.Component {

  componentDidMount() {
    $("#writeEdit-indicator").text("Write");
    $("#writeEdit-indicator").css("margin-left", "0px");
  }

  onFormSubmit = (formValues) => {
    
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let publishedAt = `${day} ${month}, ${year}`;
    this.props.createArticle(formValues, publishedAt);
  }

  render(){

    return(
      <div id="create-article">
        <div className="page-name"><h2>Write</h2></div>
        <Form
          onSubmit={this.onFormSubmit}
          editorDefault="<p>--Start Writing--</p>"
          button="Publish" />
      </div>
    );

  }

}


export default connect(null, {
  createArticle
})(CreateArticle);